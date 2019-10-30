import { ApiService } from './api';
import { TProjectStatus } from './constants';

import { ApiProject } from './endpoint/project';

interface IEndPointGetProjectsReturn {
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

interface IEndPointGetProjectHistoryReturn {
    Result: {
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



export class ApiEndPoint {
    constructor(private api: ApiService, public Project: ApiProject) { }

    GetProjects(): Promise<IEndPointGetProjectsReturn> {
        return this.api.JSON('/endpoint/getprojects', {});
    }

    GetProjectHistory(Pid: number): Promise<IEndPointGetProjectHistoryReturn> {
        return this.api.JSON('/endpoint/getprojecthistory', { Pid });
    }
}

