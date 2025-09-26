import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiEmailTemplatesDeleteRequest,
  ApiEmailTemplatesIdGetRequest,
  ApiEmailTemplatesPostRequest,
  ApiEmailTemplatesPutRequest,
} from "../NauthApi_gen";

export class EmailTemplatesControllerClient {
  private getCurrentApi() {
    return new NauthApi.EmailTemplatesApi(GetDefaultConfig());
  }

  public async GetAll() {
    const api = this.getCurrentApi();
    const method = api.apiEmailTemplatesAllGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Delete(params: ApiEmailTemplatesDeleteRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailTemplatesDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetById(params: ApiEmailTemplatesIdGetRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailTemplatesIdGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Create(params: ApiEmailTemplatesPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailTemplatesPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Update(params: ApiEmailTemplatesPutRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailTemplatesPut;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
