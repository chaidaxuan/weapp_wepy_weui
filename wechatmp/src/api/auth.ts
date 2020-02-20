import { ApiService, ISuccessE } from './api';
import { TUserRole, TUserStatus } from './constants';
import { Observable } from 'rxjs';


interface IAuthLoginReturn {
    Result: { Uid: number; Token: string; };
    Addition: { IsUnregistered: boolean; };
}

interface IAuthRegisterReturn {
    Result: { Uid: number; Token: string; };
    Addition: {};
}

type IAuthGetVerifyCodeReturn = ISuccessE;

interface IAuthResetPasswordReturn {
    Result: { Uid: number; Token: string };
    Addition: {};
}


interface IAuthIsLoggedInReturn {
    Result: { Role: TUserRole, Status: TUserStatus };
    Addition: {
        Name: string,
        Company: string,
        Phone: string,
    };
}

export let NotifyUserRoleChange: (value?: never) => void;

export class ApiAuth {
    constructor(private api: ApiService) { }


    public UserRoleObservable = new Observable<never>((observer) => {
        NotifyUserRoleChange = v => observer.next(v);
    });

    Login(Phone: string, Password: string): Promise<IAuthLoginReturn> {
        return this.api.JSON('/auth/login', { Phone, Password }).then(iSuccess => {
            const ret = iSuccess as IAuthLoginReturn;
            this.api.credential = { uid: ret.Result.Uid, token: ret.Result.Token };
            console.log('ret', ret);
            NotifyUserRoleChange();
        }) as Promise<IAuthLoginReturn>;
    }

    Register(
        Phone: string, Name: string, Password: string, Company: string,
        VerifyCode: string): Promise<IAuthRegisterReturn> {
        return this.api
            .JSON(
                '/auth/register',
                { Phone, Name, Password, Company, VerifyCode })
            .then(iSuccess => {
                const ret = iSuccess as IAuthLoginReturn;
                this.api.credential = {
                    uid: ret.Result.Uid,
                    token: ret.Result.Token
                };
                NotifyUserRoleChange();
            }) as Promise<IAuthRegisterReturn>;
    }

    GetVerifyCode(Phone: string): Promise<IAuthGetVerifyCodeReturn> {
        return this.api.JSON('/auth/getverifycode', { Phone });
    }

    ResetPassword(Phone: string, NewPassword: string, VerifyCode: string):
        Promise<IAuthResetPasswordReturn> {
        return this.api.JSON(
            '/auth/resetpassword', { Phone, NewPassword, VerifyCode }).then(iSuccess => {
                const ret = iSuccess as IAuthLoginReturn;
                this.api.credential = {
                    uid: ret.Result.Uid,
                    token: ret.Result.Token
                };
                NotifyUserRoleChange();
            }) as Promise<IAuthResetPasswordReturn>;
    }

    IsLoggedIn(): Promise<IAuthIsLoggedInReturn> {
        return this.api.JSON('/auth/isloggedin', {});
    }
}
