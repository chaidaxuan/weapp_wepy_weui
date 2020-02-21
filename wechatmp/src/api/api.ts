import { HttpClient } from '../http';



export interface IReturn {
    Status: string;
    Result: any;
    Reason: string;
    Addition: any;
}

export interface ISuccess {
    Result: any;
    Addition: any;
}

export interface ISuccessE {
    Result: null;
    Addition: null;
}



export interface IFailure {
    Reason: string;
    Addition: any;
}

export interface IBlob {
    Blob: Blob;
    Filename: string;
}

export class ApiService {
    constructor(private http: HttpClient) {
        /* expose this instance to (wx as any) for changing apiBase */
        (wx as any)['eddie'] = this;
    }

    private readonly API_BASE_KEY = 'paula_api_base';
    private readonly API_CREDENTIAL_KEY = 'paula_credential';

    get apiBase(): string {
        return (wx as any).localStorage.getItem(this.API_BASE_KEY) ||
            ((wx as any).location.origin + '/api');
    }

    set apiBase(base: string) {
        (wx as any).localStorage.setItem(this.API_BASE_KEY, base);
    }

    get credential(): { uid: number, token: string } {
        try {
            const { uid = 0, token = '' } =
                JSON.parse((wx as any).localStorage.getItem(this.API_CREDENTIAL_KEY));
            return { uid, token };
        } catch (e) {
            return { uid: 0, token: '' };
        }
    }
    set credential({ uid, token }) {
        (wx as any).localStorage.setItem(
            this.API_CREDENTIAL_KEY, JSON.stringify({ uid, token }));
    }

    JSON(api: string, request: any): Promise<ISuccess> {
        return new Promise((resolve, reject) => {
            this.http
                .post(this.apiBase + api, request, {
                    headers: {
                        'Paula-Uid': this.credential.uid.toString(),
                        'Paula-Token': this.credential.token,
                        'Content-Type': 'application/json',
                    }
                })
                .toPromise()
                .then(value => {
                    let ret = value as IReturn;
                    if ('STATUS_SUCCESS' === ret.Status) {
                        resolve({ Result: ret.Result, Addition: ret.Addition });
                    } else {
                        reject({ Reason: ret.Reason, Addition: ret.Addition });
                    }
                    wx.hideNavigationBarLoading()
                })
                .catch((reason) => {
                    reject({ Reason: 'Network Error', Addition: reason });
                    wx.hideNavigationBarLoading()
                });
        });
    }

    UPLOAD(api: string, file: File): Promise<ISuccess> {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return new Promise((resolve, reject) => {
            this.http
                .post(this.apiBase + api, formData, {
                    headers: {
                        'Paula-Uid': this.credential.uid.toString(),
                        'Paula-Token': this.credential.token,
                        // In the new version of the Content-Type under the header may not be able to use undefined,
                        //  angular submit form form to achieve file upload content-type is not multipart / form-data, 
                        //  so the solution is not to write Content-Type
                    }
                })
                .toPromise()
                .then(value => {
                    const ret = value as IReturn;
                    if ('STATUS_SUCCESS' === ret.Status) {
                        resolve({ Result: ret.Result, Addition: ret.Addition });
                    } else {
                        reject({ Reason: ret.Reason, Addition: ret.Addition });
                    }
                })
                .catch((reason) => {
                    reject({ Reason: 'Network Error', Addition: reason });
                });
        });
    }

    BLOB(api: string, request: any): Promise<IBlob> {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiBase + api, request, {
                headers: {
                    'Paula-Uid': this.credential.uid.toString(),
                    'Paula-Token': this.credential.token,
                    'Content-Type': 'application/json',
                },
                responseType: 'blob',
                observe: 'response',
            })
                .toPromise()
                .then(value => {
                    const matches = /filename="(.*?)"/g.exec(value.headers.get('Content-Disposition'));
                    // TODO: 找一个更好的办法
                    const filename = decodeURIComponent(escape(atob(matches && matches.length > 1 ? matches[1] : '')));

                    resolve({ Blob: value.body, Filename: filename });
                }).catch((reason) => {
                    reject({ Reason: 'Network Error', Addition: reason });
                });
        });
    }
}

export function PromptDownloadFile(blob: Blob, filename: string) {

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if ((wx as any).navigator && window.navigator.msSaveOrOpenBlob) {
        (wx as any).navigator.msSaveOrOpenBlob(blob);
        return;
    }

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    const data = (wx as any).URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = data;
    link.download = filename;
    link.click();
    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        (wx as any).URL.revokeObjectURL(data);
    }, 100);
}
