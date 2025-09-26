# EmailTemplatesApi

All URIs are relative to _http://localhost_

| Method                                                  | HTTP request                     | Description |
| ------------------------------------------------------- | -------------------------------- | ----------- |
| [**apiEmailTemplatesAllGet**](#apiemailtemplatesallget) | **GET** /api/EmailTemplates/all  |             |
| [**apiEmailTemplatesDelete**](#apiemailtemplatesdelete) | **DELETE** /api/EmailTemplates   |             |
| [**apiEmailTemplatesIdGet**](#apiemailtemplatesidget)   | **GET** /api/EmailTemplates/{id} |             |
| [**apiEmailTemplatesPost**](#apiemailtemplatespost)     | **POST** /api/EmailTemplates     |             |
| [**apiEmailTemplatesPut**](#apiemailtemplatesput)       | **PUT** /api/EmailTemplates      |             |

# **apiEmailTemplatesAllGet**

> EmailTemplateDTOListResponseWrapper apiEmailTemplatesAllGet()

### Example

```typescript
import { EmailTemplatesApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailTemplatesApi(configuration);

const { status, data } = await apiInstance.apiEmailTemplatesAllGet();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**EmailTemplateDTOListResponseWrapper**

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

# **apiEmailTemplatesDelete**

> StringResponseWrapper apiEmailTemplatesDelete()

### Example

```typescript
import { EmailTemplatesApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailTemplatesApi(configuration);

let id: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiEmailTemplatesDelete(id);
```

### Parameters

| Name   | Type         | Description | Notes                            |
| ------ | ------------ | ----------- | -------------------------------- |
| **id** | [**number**] |             | (optional) defaults to undefined |

### Return type

**StringResponseWrapper**

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

# **apiEmailTemplatesIdGet**

> EmailTemplateDTOResponseWrapper apiEmailTemplatesIdGet()

### Example

```typescript
import { EmailTemplatesApi, Configuration } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailTemplatesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.apiEmailTemplatesIdGet(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] |             | defaults to undefined |

### Return type

**EmailTemplateDTOResponseWrapper**

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

# **apiEmailTemplatesPost**

> EmailTemplateDTOResponseWrapper apiEmailTemplatesPost()

### Example

```typescript
import { EmailTemplatesApi, Configuration, CreateEmailTemplateDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailTemplatesApi(configuration);

let createEmailTemplateDTO: CreateEmailTemplateDTO; // (optional)

const { status, data } = await apiInstance.apiEmailTemplatesPost(createEmailTemplateDTO);
```

### Parameters

| Name                       | Type                       | Description | Notes |
| -------------------------- | -------------------------- | ----------- | ----- |
| **createEmailTemplateDTO** | **CreateEmailTemplateDTO** |             |       |

### Return type

**EmailTemplateDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiEmailTemplatesPut**

> EmailTemplateDTOResponseWrapper apiEmailTemplatesPut()

### Example

```typescript
import { EmailTemplatesApi, Configuration, EmailTemplateDTO } from "./api";

const configuration = new Configuration();
const apiInstance = new EmailTemplatesApi(configuration);

let emailTemplateDTO: EmailTemplateDTO; // (optional)

const { status, data } = await apiInstance.apiEmailTemplatesPut(emailTemplateDTO);
```

### Parameters

| Name                 | Type                 | Description | Notes |
| -------------------- | -------------------- | ----------- | ----- |
| **emailTemplateDTO** | **EmailTemplateDTO** |             |       |

### Return type

**EmailTemplateDTOResponseWrapper**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, text/json, application/\*+json
- **Accept**: text/plain, application/json, text/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | OK          | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
