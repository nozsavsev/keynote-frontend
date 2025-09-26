import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class UserControllerSSR {
  private getCurrentApi(params: SSRConfigParameters) {
    return new KeynoteApi.UserApi(GetSSRDefaultConfig(params));
  }

  public async CurrentUser(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserCurrentUserGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
