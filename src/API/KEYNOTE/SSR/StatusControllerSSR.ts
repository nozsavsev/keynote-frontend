import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as KeynoteApi from "../KeynoteApi_gen";

export class StatusControllerSSR {
  private getCurrentApi(params: SSRConfigParameters) {
    return new KeynoteApi.StatusApi(GetSSRDefaultConfig(params));
  }

  public async Status(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.statusGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
