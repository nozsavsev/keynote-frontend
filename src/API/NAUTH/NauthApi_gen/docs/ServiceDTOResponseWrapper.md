# ServiceDTOResponseWrapper

## Properties

| Name                             | Type                                                         | Description | Notes                             |
| -------------------------------- | ------------------------------------------------------------ | ----------- | --------------------------------- |
| **status**                       | [**WrResponseStatus**](WrResponseStatus.md)                  |             | [optional] [default to undefined] |
| **authenticationFailureReasons** | [**Array&lt;AuthFailureReasons&gt;**](AuthFailureReasons.md) |             | [optional] [default to undefined] |
| **response**                     | [**ServiceDTO**](ServiceDTO.md)                              |             | [optional] [default to undefined] |

## Example

```typescript
import { ServiceDTOResponseWrapper } from "./api";

const instance: ServiceDTOResponseWrapper = {
  status,
  authenticationFailureReasons,
  response,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
