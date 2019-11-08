import { ApiService, ISuccessE } from './api';
import { TUserRole, TUserStatus, TProjectStatus } from './constants';




interface IProjectAccountCreatePhonePlaceholderReturn {
    Result: { Uid: number };
    Addition: {};
}

interface IProjectAccountProjectApprovalReturn {
    Result: { Pid: number };
    Addition: {};
}

interface IProjectAccountSearchUserReturn {
    Result: {
        Uid: number;
        Phone: string;
        Name: string;
        Role: TUserRole;
        Status: TUserStatus;
        Company: string;
        CreatorDescription: string;
    };
    Addition: {};
}

interface IProjectAccountModifyProjectInfoReturn {
    Result: {
        Pid: number;
        PName: string;
        ClientCode: string;
        ClientName: string;
        Description: string;
        Comment: string;
        ProjectAccountName: string;
        ProjectAccountPhone: string;
    };
    Addition: {};
}

interface IProjectAccountSetProjectStatusReturn {
    Result: {
        Pid: number;
    };
    Addition: {};
}

export class ApiProjectAccount {
    constructor(private api: ApiService) { }

    CreatePhonePlaceholder(Phone: string): Promise<IProjectAccountCreatePhonePlaceholderReturn> {
        return this.api.JSON('/projectaccount/createphoneplaceholder', { Phone });
    }

    ProjectApproval(PName: string, ClientCode: string, ClientName: string, Description: string, Comment: string):
        Promise<IProjectAccountProjectApprovalReturn> {
        return this.api.JSON('/projectaccount/projectapproval', { PName, ClientCode, ClientName, Description, Comment });
    }

    SearchUser(Phone: string): Promise<IProjectAccountSearchUserReturn> {
        return this.api.JSON('/projectaccount/searchuser', { Phone });
    }

    ModifyProjectInfo(Pid: number, PName: string, ClientCode: string, ClientName: string, Description: string, Comment: string, ProjectAccountUid: number):
        Promise<IProjectAccountModifyProjectInfoReturn> {
        return this.api.JSON('/projectaccount/modifyprojectinfo', { Pid, PName, ClientCode, ClientName, Description, Comment, ProjectAccountUid })
    }

    SetProjectStatus(Pid: number, Status: TProjectStatus):
        Promise<IProjectAccountSetProjectStatusReturn> {
        return this.api.JSON('/projectaccount/setprojectstatus', { Pid, Status })
    }

}
