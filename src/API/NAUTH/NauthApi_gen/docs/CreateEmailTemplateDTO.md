# CreateEmailTemplateDTO

## Properties

| Name         | Type                                          | Description | Notes                             |
| ------------ | --------------------------------------------- | ----------- | --------------------------------- |
| **name**     | **string**                                    |             | [optional] [default to undefined] |
| **isActive** | **boolean**                                   |             | [optional] [default to undefined] |
| **type**     | [**EmailTemplateType**](EmailTemplateType.md) |             | [optional] [default to undefined] |
| **subject**  | **string**                                    |             | [optional] [default to undefined] |
| **body**     | **string**                                    |             | [optional] [default to undefined] |
| **htmlBody** | **string**                                    |             | [optional] [default to undefined] |

## Example

```typescript
import { CreateEmailTemplateDTO } from "./api";

const instance: CreateEmailTemplateDTO = {
  name,
  isActive,
  type,
  subject,
  body,
  htmlBody,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
