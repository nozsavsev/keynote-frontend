# EmailTemplateDTO

## Properties

| Name          | Type                                          | Description | Notes                             |
| ------------- | --------------------------------------------- | ----------- | --------------------------------- |
| **id**        | **number**                                    |             | [optional] [default to undefined] |
| **name**      | **string**                                    |             | [optional] [default to undefined] |
| **isActive**  | **boolean**                                   |             | [optional] [default to undefined] |
| **type**      | [**EmailTemplateType**](EmailTemplateType.md) |             | [optional] [default to undefined] |
| **subject**   | **string**                                    |             | [optional] [default to undefined] |
| **body**      | **string**                                    |             | [optional] [default to undefined] |
| **htmlBody**  | **string**                                    |             | [optional] [default to undefined] |
| **createdAt** | **string**                                    |             | [optional] [default to undefined] |

## Example

```typescript
import { EmailTemplateDTO } from "./api";

const instance: EmailTemplateDTO = {
  id,
  name,
  isActive,
  type,
  subject,
  body,
  htmlBody,
  createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
