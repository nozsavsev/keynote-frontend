import { ExecuteApiRequest, GetDefaultConfig } from "../API";
import * as NauthApi from "../NauthApi_gen";
import {
  ApiUserManagementDeleteAccountRequestPostRequest,
  ApiUserManagementDeleteUserPostRequest,
  ApiUserManagementDisableUserPostRequest,
  ApiUserManagementEnableUserPostRequest,
  ApiUserManagementFetchUsersGetRequest,
  ApiUserManagementForceUnVerifyEmailPostRequest,
  ApiUserManagementForceVerifyEmailPostRequest,
  ApiUserManagementPasswordResetRequestPostRequest,
  ApiUserManagementRevokeAllUserSessionsPostRequest,
  ApiUserManagementSetUserEmailPostRequest,
  ApiUserManagementSetUserPasswordPostRequest,
  ApiUserManagementUpdatePermissionsPostRequest,
  ApiUserManagementUpdateUserNamePostRequest,
} from "../NauthApi_gen";

export class UserManagementControllerClient {
  private getCurrentApi() {
    return new NauthApi.UserManagementApi(GetDefaultConfig());
  }

  public async GetAllUsers(params: ApiUserManagementFetchUsersGetRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementFetchUsersGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async GetAllPermissions() {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementFetchPermissionsGet;
    return await ExecuteApiRequest<typeof method>(method.bind(api), {});
  }

  public async UpdatePermissions(params: ApiUserManagementUpdatePermissionsPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementUpdatePermissionsPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteUser(params: ApiUserManagementDeleteUserPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementDeleteUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ForceVerifyEmail(params: ApiUserManagementForceVerifyEmailPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementForceVerifyEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ForceUnVerifyEmail(params: ApiUserManagementForceUnVerifyEmailPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementForceUnVerifyEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DisableUser(params: ApiUserManagementDisableUserPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementDisableUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async EnableUser(params: ApiUserManagementEnableUserPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementEnableUserPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async SetUserEmail(params: ApiUserManagementSetUserEmailPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementSetUserEmailPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async SetUserPassword(params: ApiUserManagementSetUserPasswordPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementSetUserPasswordPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async RevokeAllUserSessions(params: ApiUserManagementRevokeAllUserSessionsPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementRevokeAllUserSessionsPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async UpdateUserName(params: ApiUserManagementUpdateUserNamePostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementUpdateUserNamePost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async NeutralizeEmailAction(params: NauthApi.ApiUserManagementNeutralizeEmailActionPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementNeutralizeEmailActionPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async VerifyEmailRequest(params: NauthApi.ApiUserManagementVerifyEmailRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementVerifyEmailRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async PasswordResetRequest(params: ApiUserManagementPasswordResetRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementPasswordResetRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async DeleteAccountRequest(params: ApiUserManagementDeleteAccountRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementDeleteAccountRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }

  public async ChangeEmailRequest(params: NauthApi.ApiUserManagementChangeEmailRequestPostRequest) {
    const api = this.getCurrentApi();
    const method = api.apiUserManagementChangeEmailRequestPost;
    return await ExecuteApiRequest<typeof method>(method.bind(api), params);
  }
}
