import { ApiService } from './api/api';

export * from './api/constants';
export { ISuccess, IFailure, IBlob, PromptDownloadFile } from './api/api';

import { ApiFile } from './api/file';
import { ApiAuth } from './api/auth';
import { ApiAdmin } from './api/admin';
import { ApiProjectAccount } from './api/projectaccount';
import { ApiProfile } from './api/profile';
import { ApiEndPoint } from './api/endpoint';
import { ApiProject } from './api/endpoint/project';
import { ApiDesign } from './api/endpoint/project/design';
import { ApiDelivery } from './api/endpoint/project/delivery';
import { ApiProduction } from './api/endpoint/project/production';
import { ApiProjectUser } from './api/endpoint/project/projectuser';

/**
 * Example
 *
 * ApiAuth.Login('13501626775', '123456')
 *     .then(iReturn => {
 *       console.log(
 *           'result:', iReturn.Result, ', addition:', iReturn.Addition);
 *     })
 *     .catch((iFailure: IFailure) => {
 *       console.log('reason:', iFailure);
 *     });
 *
 */

// @Injectable({ providedIn: 'root' })
class APIConstructor {
  constructor(
    public File: ApiFile,
    public Auth: ApiAuth,
    public Admin: ApiAdmin,
    public ProjectAccount: ApiProjectAccount,
    public Profile: ApiProfile,
    public EndPoint: ApiEndPoint,
  ) { }

  public log(category: string, ...items: any[]) {
    // TODO: 1. 美化， 2. 判断正式环境则不输出
    console.log(`%c${category}: %c${JSON.stringify(items, null, 2)}`, 'color: blue;', 'color: black;');
  }

}

const apiService = new ApiService(null/*todo*/);
const apiAuth = new ApiAuth(apiService);
const apiProject = new ApiProject(
  apiService,
  new ApiDesign(apiService),
  new ApiProjectUser(apiService),
  new ApiProduction(apiService),
  new ApiDelivery(apiService),
);

export const API = new APIConstructor(
  new ApiFile(apiService),
  apiAuth,
  new ApiAdmin(apiService),
  new ApiProjectAccount(apiService),
  new ApiProfile(apiService, apiAuth),
  new ApiEndPoint(apiService, apiProject),
);

