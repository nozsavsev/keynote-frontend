import { ExecuteApiRequest, GetSSRDefaultConfig, SSRConfigParameters } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiUserManagementDeleteAccountRequestPostRequest,
  ApiUserManagementDeleteUserPostRequest,
  ApiUserManagementFetchUsersGetRequest,
  ApiUserManagementForceVerifyEmailPostRequest,
  ApiUserManagementPasswordResetRequestPostRequest,
  ApiUserManagementUpdatePermissionsPostRequest,
} from "../NauthApi_gen";

export class UserManagementControllerSSR {
  private getCurrentApi(config: SSRConfigParameters) {
    return new NauthApi.UserManagementApi(GetSSRDefaultConfig(config));
  }

  public async GetAllPermissions(params: SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementFetchPermissionsGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async GetAllUsers(params: ApiUserManagementFetchUsersGetRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementFetchUsersGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UpdatePermissions(params: ApiUserManagementUpdatePermissionsPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementUpdatePermissionsPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteUser(params: ApiUserManagementDeleteUserPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementDeleteUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ForceVerifyEmail(params: ApiUserManagementForceVerifyEmailPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementForceVerifyEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ForceUnVerifyEmail(params: NauthApi.ApiUserManagementForceUnVerifyEmailPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementForceUnVerifyEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DisableUser(params: NauthApi.ApiUserManagementDisableUserPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementDisableUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async EnableUser(params: NauthApi.ApiUserManagementEnableUserPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementEnableUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async SetUserEmail(params: NauthApi.ApiUserManagementSetUserEmailPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementSetUserEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async SetUserPassword(params: NauthApi.ApiUserManagementSetUserPasswordPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementSetUserPasswordPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async RevokeAllUserSessions(params: NauthApi.ApiUserManagementRevokeAllUserSessionsPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementRevokeAllUserSessionsPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UpdateUserName(params: NauthApi.ApiUserManagementUpdateUserNamePostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementUpdateUserNamePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async NeutralizeEmailAction(params: NauthApi.ApiUserManagementNeutralizeEmailActionPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementNeutralizeEmailActionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async VerifyEmailRequest(params: NauthApi.ApiUserManagementVerifyEmailRequestPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementVerifyEmailRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetRequest(params: ApiUserManagementPasswordResetRequestPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementPasswordResetRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountRequest(params: ApiUserManagementDeleteAccountRequestPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementDeleteAccountRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailRequest(params: NauthApi.ApiUserManagementChangeEmailRequestPostRequest & SSRConfigParameters) {
    const api = this.getCurrentApi(params);
    const method = api.apiUserManagementChangeEmailRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
