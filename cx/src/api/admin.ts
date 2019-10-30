import { ApiService, ISuccessE } from './api';
import { TUserRole, TUserStatus, TProjectStatus, TProjectRole, TUserLogOperation } from './constants';


type IAdminSetUserRoleReturn = ISuccessE;

type IAdminSetUserStatusReturn = ISuccessE;

interface IAdminGetProjectAccountsReturn {
    Result: {
        ProjectAccounts: {
            Uid: number;
            Phone: string;
            Name: string;
            Role: TUserRole;
            Status: TUserStatus;
            Company: string;
        }[];
    };
    Addition: {};
}

interface IAdminGetProjects {
    Result: {
        Projects: {
            Pid: number;
            PName: string;
            CreatorName: string;
            CreatorPhone: string;
            ProjectAccountName: string;
            ProjectAccountPhone: string;
            ProjectAccountUid: number;
            ClientCode: string;
            ClientName: string;
            Description: string;
            Comment: string;
            Status: TProjectStatus;
            LastModified: number;
        }[];
    };
    Addition: {};
}



interface IAdminGetUserLogsReturn {
    Result: {
        UserLogs: {
            Uid: number;
            Operation: TUserLogOperation;
            OperationTime: number;
            OperatorPhone: string;
            OperatorName: string;
        }[];
    };
    Addition: {};
}

interface IAdminGetProjectsByUidReturn {
    Result: {
        Name: string;
        Projects: {
            Pid: number;
            PName: string;
            CreatorName: string;
            CreatorPhone: string;
            ProjectAccountUid: number;
            ProjectAccountName: string;
            ProjectAccountPhone: string;
            ClientCode: string;
            ClientName: string;
            Description: string;
            Comment: string;
            Status: TProjectStatus;
            LastModified: number;
        }[];
    };
    Addition: {};
}

interface IAdminGetUsersReturn {
    Result: {
        Users: {
            Uid: number;
            Phone: string;
            Name: string;
            Role: TUserRole;
            Status: TUserStatus;
            Company: string;
            CreatorDescription: string;
        }[];
    };
    Addition: {};
}



interface IAdminGetProjectRolesByUidReturn {
    Result: {
        Name: string;
        ProjectUsers: {
            Pid: number;
            Uid: number;
            Role: TProjectRole;
            PName: string;
            Name: string;
        }[];
    };
    Addition: {};
}

export class ApiAdmin {
    constructor(private api: ApiService) { }

    SetUserRole(Uid: number, Role: TUserRole): Promise<IAdminSetUserRoleReturn> {
        return this.api.JSON('/admin/setuserrole', { Uid, Role });
    }

    SetUserStatus(Uid: number, Status: TUserStatus): Promise<IAdminSetUserStatusReturn> {
        return this.api.JSON('/admin/setuserstatus', { Uid, Status });
    }

    GetProjectAccounts(): Promise<IAdminGetProjectAccountsReturn> {
        return this.api.JSON('/admin/getprojectaccounts', {});
    }


    GetProjects(): Promise<IAdminGetProjects> {
        return this.api.JSON('/admin/getprojects', {});
    }

    GetUserLogs(Uid: number): Promise<IAdminGetUserLogsReturn> {
        return this.api.JSON('/admin/getuserlogs', { Uid });
    }

    GetProjectsByUid(Uid: number): Promise<IAdminGetProjectsByUidReturn> {
        return this.api.JSON('/admin/getprojectsbyuid', { Uid });
    }

    GetUsers(): Promise<IAdminGetUsersReturn> {
        return this.api.JSON('/admin/getusers', {});
    }

    GetProjectRolesByUid(Uid: number): Promise<IAdminGetProjectRolesByUidReturn> {
        return this.api.JSON('/admin/getprojectrolesbyuid', { Uid });
    }

}
