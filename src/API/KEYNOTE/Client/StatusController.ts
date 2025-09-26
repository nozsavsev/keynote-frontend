import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class StatusControllerClient {
  private getCurrentApi() {
    return new KeynoteApi.StatusApi(GetDefaultConfig());
  }

  public async Status() {
    const api = this.getCurrentApi();
    const method = api.statusGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
