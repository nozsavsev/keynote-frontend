import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class UserControllerClient {
  private getCurrentApi() {
    return new KeynoteApi.UserApi(GetDefaultConfig());
  }

  public async CurrentUser() {
    const api = this.getCurrentApi();
    const method = api.apiUserCurrentUserGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
