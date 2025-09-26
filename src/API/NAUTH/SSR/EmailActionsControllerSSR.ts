import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiEmailActionsApplyEmailRequestPostRequest,
  ApiEmailActionsChangeEmailApplyPostRequest,
  ApiEmailActionsChangeEmailRequestPostRequest,
  ApiEmailActionsDecodeApplyTokenPostRequest,
  ApiEmailActionsDeleteAccountApplyPostRequest,
  ApiEmailActionsEmailSignInRequestPostRequest,
  ApiEmailActionsNeutralizeEmailActionPostRequest,
  ApiEmailActionsPasswordResetApplyPostRequest,
  ApiEmailActionsPasswordResetRequestPostRequest,
} from "../NauthApi_gen";

export class EmailActionsControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.EmailActionsApi(GetSSRDefaultConfig(config));
  }
  public async NeutralizeEmailAction(config: SSRConfigParameters, params: ApiEmailActionsNeutralizeEmailActionPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsNeutralizeEmailActionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetMyEmailActions(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsGetAllByUserIdGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async DecodeToken(config: SSRConfigParameters, params: ApiEmailActionsDecodeApplyTokenPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsDecodeApplyTokenPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ApplyEmailRequest(config: SSRConfigParameters, params: ApiEmailActionsApplyEmailRequestPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsApplyEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailApply(config: SSRConfigParameters, params: ApiEmailActionsChangeEmailApplyPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsChangeEmailApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailRequest(config: SSRConfigParameters, params: ApiEmailActionsChangeEmailRequestPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsChangeEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountApply(config: SSRConfigParameters, params: ApiEmailActionsDeleteAccountApplyPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsDeleteAccountApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountRequest(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsDeleteAccountRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async EmailCodeRequest(config: SSRConfigParameters) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsEmailCodeRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async EmailSignInRequest(config: SSRConfigParameters, params: ApiEmailActionsEmailSignInRequestPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsEmailSignInRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetApply(config: SSRConfigParameters, params: ApiEmailActionsPasswordResetApplyPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsPasswordResetApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetRequest(config: SSRConfigParameters, params: ApiEmailActionsPasswordResetRequestPostRequest) {
    const api = this.getCurrentApi(config);
    const method = api.apiEmailActionsPasswordResetRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async VerifyEmailRequest(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiEmailActionsVerifyEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
