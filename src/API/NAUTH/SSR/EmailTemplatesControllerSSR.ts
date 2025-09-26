import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiEmailTemplatesDeleteRequest,
  ApiEmailTemplatesIdGetRequest,
  ApiEmailTemplatesPostRequest,
  ApiEmailTemplatesPutRequest,
} from "../NauthApi_gen";

export class EmailTemplatesControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.EmailTemplatesApi(GetSSRDefaultConfig(config));
  }

  public async GetAll(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailTemplatesAllGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api));
  }

  public async Delete(config: SSRConfigParameters, params: ApiEmailTemplatesDeleteRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailTemplatesDelete;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetById(params: ApiEmailTemplatesIdGetRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiEmailTemplatesIdGet;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Create(config: SSRConfigParameters, params: ApiEmailTemplatesPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailTemplatesPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async Update(config: SSRConfigParameters, params: ApiEmailTemplatesPutRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailTemplatesPut;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
