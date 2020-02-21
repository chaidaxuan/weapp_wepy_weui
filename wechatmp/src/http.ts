/// <reference path="../node_modules/miniprogram-api-typings/index.d.ts" />

import httpMixin from './mixins/http';

if ((wx as any).localStorage === undefined) {
    ((target: any) => {
        target.localStorage = {
            getItem: (key: string): string => {
                return wx.getStorageSync(key);;
            },
            setItem: (key: string, value: string): void => {
                wx.setStorageSync(key, value);
            },
        };

        target.location = {
            origin: 'https://paula.eigenvr.com',
        };
    })(wx);
}

export class HttpClient {
    // public post(url: String, param: any, options?: any): Observable<Object> {
    //     return null;
    // }
    http: httpMixin;
    constructor() {
        this.http = new httpMixin();
    }

    post(url: string, body: any | null, options?: {
        headers?: {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): { toPromise: () => Promise<Object> } {

        const p = this.http.$post({
            url: url,
            headers: options.headers,
            data: body,
        }).then(({ data }) => data);

        return {
            toPromise: () => {
                return p;
            }
        };
    }

    get(url: string, body: any | null, options?: {
        headers?: {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): { toPromise: () => Promise<Object> } {

        const p = this.http.$get({
            url: url,
            headers: options.headers,
            data: body,
        }).then(({ data }) => data);

        return {
            toPromise: () => {
                return p;
            }
        };
    }
}


