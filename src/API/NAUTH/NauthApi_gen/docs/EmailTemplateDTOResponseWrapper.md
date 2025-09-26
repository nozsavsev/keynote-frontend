# EmailTemplateDTOResponseWrapper

## Properties

| Name                             | Type                                                         | Description | Notes                             |
| -------------------------------- | ------------------------------------------------------------ | ----------- | --------------------------------- |
| **status**                       | [**WrResponseStatus**](WrResponseStatus.md)                  |             | [optional] [default to undefined] |
| **authenticationFailureReasons** | [**Array&lt;AuthFailureReasons&gt;**](AuthFailureReasons.md) |             | [optional] [default to undefined] |
| **response**                     | [**EmailTemplateDTO**](EmailTemplateDTO.md)                  |             | [optional] [default to undefined] |

## Example

```typescript
import { EmailTemplateDTOResponseWrapper } from "./api";

const instance: EmailTemplateDTOResponseWrapper = {
  status,
  authenticationFailureReasons,
  response,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
