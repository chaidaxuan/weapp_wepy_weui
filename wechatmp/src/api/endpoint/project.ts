import { ApiService } from '../api';
import { TProjectRole } from '../constants';

import { ApiDesign } from './project/design';
import { ApiProjectUser } from './project/projectuser';
import { ApiProduction } from './project/production';
import { ApiReceivingDelivery } from './project/receivingdelivery';
import { ApiSettlement } from './project/settlement';


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
        public Production: ApiProduction,
        public Design: ApiDesign,
        public ReceivingDelivery: ApiReceivingDelivery,
        public ProjectUser: ApiProjectUser,
        public Settlement: ApiSettlement,
    ) { }


    GetProjectRole(Pid: number): Promise<IEndPointGetProjectRoleReturn> {
        return this.api.JSON('/endpoint/project/getprojectrole', { Pid });
    }
}
