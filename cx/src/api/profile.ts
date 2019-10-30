import { ApiService, ISuccessE } from './api';
import { ApiAuth, NotifyUserRoleChange } from './auth';


type IProfileChangePasswordReturn = ISuccessE;

interface IProfileGetProfileReturn {
    Result: { Name: string; Company: string; Phone: string; };
    Addition: {};
}

type IProfileSetProfileReturn = ISuccessE;

type IProfileLogoutReturn = ISuccessE;



export class ApiProfile {
    constructor(private api: ApiService, private auth: ApiAuth) { }

    ChangePassword(NewPassword: string): Promise<IProfileChangePasswordReturn> {
        return this.api.JSON('/profile/changepassword', { NewPassword });
    }

    GetProfile(): Promise<IProfileGetProfileReturn> {
        return this.api.JSON('/profile/getprofile', {});
    }

    SetProfile(Name: string, Company: string): Promise<IProfileSetProfileReturn> {
        return this.api.JSON('/profile/setprofile', { Name, Company });
    }

    Logout(): Promise<IProfileLogoutReturn> {
        return this.api.JSON('/profile/logout', {}).then(iSuccess => {
            NotifyUserRoleChange();
        }) as Promise<IProfileLogoutReturn>;
    }
}
