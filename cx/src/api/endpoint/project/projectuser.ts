
import { ApiService, ISuccessE, IBlob } from '../../api';
import { TProjectRole } from '../../constants';


interface IEndPointGetProjectUsersReturn {
    Result: {
        ProjectUsers: {
            Pid: number;
            Uid: number;
            Role: TProjectRole;
            Name: string;
            Phone: string;
            Company: string;
        }[];
    };
    Addition: {};
}

type IEndPointGrantProjectUserReturn = ISuccessE;

type IEndPointRevokeProjectUserReturn = ISuccessE;

interface IEndPointSearchProjectUserReturn {
    Result: {
        Uid: number;
    };
    Addition: {};
}

interface IEndPointGetUserUidReturn {
    Result: {
        Pid: number;
        Uid: number;
        Role: TProjectRole;
        Name: string;
        Phone: string;
        Company: string;
    };
    Addition: {};
}

export class ApiProjectUser {
    constructor(private api: ApiService) { }

    GetProjectUsers(Pid: number): Promise<IEndPointGetProjectUsersReturn> {
        return this.api.JSON('/endpoint/project/projectuser/getprojectusers', { Pid });
    }

    GrantProjectUser(Pid: number, Uid: number, Role: TProjectRole):
        Promise<IEndPointGrantProjectUserReturn> {
        return this.api.JSON('/endpoint/project/projectuser/grantprojectuser', { Pid, Uid, Role });
    }

    RevokeProjectUser(Pid: number, Uid: number): Promise<IEndPointRevokeProjectUserReturn> {
        return this.api.JSON('/endpoint/project/projectuser/revokeprojectuser', { Pid, Uid });
    }

    SearchProjectUser(Pid: number, Phone: string): Promise<IEndPointSearchProjectUserReturn> {
        return this.api.JSON('/endpoint/project/projectuser/searchprojectuser', { Pid, Phone });
    }

    GetUserUid(Pid: number, Phone: string): Promise<IEndPointGetUserUidReturn> {
        return this.api.JSON('/endpoint/project/projectuser/getuseruid', { Pid, Phone });
    }

    GetFactoryUsers(Pid: number, Uid: number): Promise<IEndPointGetProjectUsersReturn> {
        return this.api.JSON('/endpoint/project/projectuser/getfactoryusers', { Pid, Uid });
    }

}
