import { ApiService } from '../api';
import { TProjectRole } from '../constants';

import { ApiDesign } from './project/design';
import { ApiProjectUser } from './project/projectuser';
import { ApiProduction } from './project/production';


interface IEndPointGetProjectRoleReturn {
    Result: {
        Pid: number;
        Role: TProjectRole;
    };
    Addition: {};
}

export class ApiProject {
    constructor(
        private api: ApiService,
        public Design: ApiDesign,
        public ProjectUser: ApiProjectUser,
        public Production: ApiProduction,
    ) { }


    GetProjectRole(Pid: number): Promise<IEndPointGetProjectRoleReturn> {
        return this.api.JSON('/endpoint/project/getprojectrole', { Pid });
    }
}
