# EmailActionsApi

All URIs are relative to _http://localhost_

| Method                                                                                    | HTTP request                                     | Description |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- |
| [**apiEmailActionsApplyEmailRequestPost**](#apiemailactionsapplyemailrequestpost)         | **POST** /api/EmailActions/applyEmailRequest     |             |
| [**apiEmailActionsChangeEmailApplyPost**](#apiemailactionschangeemailapplypost)           | **POST** /api/EmailActions/changeEmailApply      |             |
| [**apiEmailActionsChangeEmailRequestPost**](#apiemailactionschangeemailrequestpost)       | **POST** /api/EmailActions/changeEmailRequest    |             |
| [**apiEmailActionsDecodeApplyTokenPost**](#apiemailactionsdecodeapplytokenpost)           | **POST** /api/EmailActions/decodeApplyToken      |             |
| [**apiEmailActionsDeleteAccountApplyPost**](#apiemailactionsdeleteaccountapplypost)       | **POST** /api/EmailActions/deleteAccountApply    |             |
| [**apiEmailActionsDeleteAccountRequestPost**](#apiemailactionsdeleteaccountrequestpost)   | **POST** /api/EmailActions/deleteAccountRequest  |             |
| [**apiEmailActionsEmailCodeRequestPost**](#apiemailactionsemailcoderequestpost)           | **POST** /api/EmailActions/emailCodeRequest      |             |
| [**apiEmailActionsEmailSignInRequestPost**](#apiemailactionsemailsigninrequestpost)       | **POST** /api/EmailActions/emailSignInRequest    |             |
| [**apiEmailActionsGetAllByUserIdGet**](#apiemailactionsgetallbyuseridget)                 | **GET** /api/EmailActions/getAllByUserId         |             |
| [**apiEmailActionsNeutralizeEmailActionPost**](#apiemailactionsneutralizeemailactionpost) | **POST** /api/EmailActions/neutralizeEmailAction |             |
| [**apiEmailActionsPasswordResetApplyPost**](#apiemailactionspasswordresetapplypost)       | **POST** /api/EmailActions/passwordResetApply    |             |
| [**apiEmailActionsPasswordResetRequestPost**](#apiemailactionspasswordresetrequestpost)   | **POST** /api/EmailActions/passwordResetRequest  |             |
| [**apiEmailActionsVerifyEmailRequestPost**](#apiemailactionsverifyemailrequestpost)       | **POST** /api/EmailActions/verifyEmailRequest    |             |

# **apiEmailActionsApplyEmailRequestPost**

> ApplyEmailActionResponseResponseWrapper apiEmailActionsApplyEmailRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let token: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsApplyEmailRequestPost(token);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **token** | [**string**] |             | (optional) defaults to undefined |

### Return type

**ApplyEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsChangeEmailApplyPost**

> ApplyEmailActionResponseResponseWrapper apiEmailActionsChangeEmailApplyPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let token: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsChangeEmailApplyPost(token);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **token** | [**string**] |             | (optional) defaults to undefined |

### Return type

**ApplyEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsChangeEmailRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsChangeEmailRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let newEmail: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsChangeEmailRequestPost(newEmail);
```

### Parameters

| Name         | Type         | Description | Notes                            |
| ------------ | ------------ | ----------- | -------------------------------- |
| **newEmail** | [**string**] |             | (optional) defaults to undefined |

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsDecodeApplyTokenPost**

> DecodedEmailActionDTOResponseWrapper apiEmailActionsDecodeApplyTokenPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let token: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsDecodeApplyTokenPost(token);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **token** | [**string**] |             | (optional) defaults to undefined |

### Return type

**DecodedEmailActionDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsDeleteAccountApplyPost**

> ApplyEmailActionResponseResponseWrapper apiEmailActionsDeleteAccountApplyPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let token: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsDeleteAccountApplyPost(token);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **token** | [**string**] |             | (optional) defaults to undefined |

### Return type

**ApplyEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsDeleteAccountRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsDeleteAccountRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

const { status, data } = await apiInstance.apiEmailActionsDeleteAccountRequestPost();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsEmailCodeRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsEmailCodeRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

const { status, data } = await apiInstance.apiEmailActionsEmailCodeRequestPost();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsEmailSignInRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsEmailSignInRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let email: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsEmailSignInRequestPost(email);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **email** | [**string**] |             | (optional) defaults to undefined |

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsGetAllByUserIdGet**

> EmailActionDTOListResponseWrapper apiEmailActionsGetAllByUserIdGet()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

const { status, data } = await apiInstance.apiEmailActionsGetAllByUserIdGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**EmailActionDTOListResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsNeutralizeEmailActionPost**

> NeutralizeEmailActionResponseResponseWrapper apiEmailActionsNeutralizeEmailActionPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsNeutralizeEmailActionPost(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**NeutralizeEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsPasswordResetApplyPost**

> ApplyEmailActionResponseResponseWrapper apiEmailActionsPasswordResetApplyPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let token: string; // (optional) (default to undefined)
let password: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsPasswordResetApplyPost(token, password);
```

### Parameters

| Name         | Type         | Description | Notes                            |
| ------------ | ------------ | ----------- | -------------------------------- |
| **token**    | [**string**] |             | (optional) defaults to undefined |
| **password** | [**string**] |             | (optional) defaults to undefined |

### Return type

**ApplyEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsPasswordResetRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsPasswordResetRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

let email: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailActionsPasswordResetRequestPost(email);
```

### Parameters

| Name      | Type         | Description | Notes                            |
| --------- | ------------ | ----------- | -------------------------------- |
| **email** | [**string**] |             | (optional) defaults to undefined |

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailActionsVerifyEmailRequestPost**

> RequestEmailActionResponseResponseWrapper apiEmailActionsVerifyEmailRequestPost()

### Example

```typescript
import { EmailActionsApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailActionsApi(configuration);

const { status, data } = await apiInstance.apiEmailActionsVerifyEmailRequestPost();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**RequestEmailActionResponseResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
