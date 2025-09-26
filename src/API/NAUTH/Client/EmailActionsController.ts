import { ExecuteApiRequest, GetDefaultConfig } from "../API";
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

export class EmailActionsControllerClient {
  private getCurrentApi() {
    return new NauthApi.EmailActionsApi(GetDefaultConfig());
  }

  public async NeutralizeEmailAction(params: ApiEmailActionsNeutralizeEmailActionPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsNeutralizeEmailActionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetMyEmailActions() {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsGetAllByUserIdGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async DecodeToken(params: ApiEmailActionsDecodeApplyTokenPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsDecodeApplyTokenPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ApplyEmailRequest(params: ApiEmailActionsApplyEmailRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsApplyEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailApply(params: ApiEmailActionsChangeEmailApplyPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsChangeEmailApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailRequest(params: ApiEmailActionsChangeEmailRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsChangeEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountApply(params: ApiEmailActionsDeleteAccountApplyPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsDeleteAccountApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountRequest() {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsDeleteAccountRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async EmailCodeRequest() {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsEmailCodeRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async EmailSignInRequest(params: ApiEmailActionsEmailSignInRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsEmailSignInRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetApply(params: ApiEmailActionsPasswordResetApplyPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsPasswordResetApplyPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetRequest(params: ApiEmailActionsPasswordResetRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsPasswordResetRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async VerifyEmailRequest() {
    const api = this.getCurrentApi();
    const method = api.apiEmailActionsVerifyEmailRequestPost;

    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }
}
