# StringResponseWrapper

## Properties

| Name                             | Type                                                         | Description | Notes                             |
| -------------------------------- | ------------------------------------------------------------ | ----------- | --------------------------------- |
| **status**                       | [**WrResponseStatus**](WrResponseStatus.md)                  |             | [optional] [default to undefined] |
| **authenticationFailureReasons** | [**Array&lt;AuthFailureReasons&gt;**](AuthFailureReasons.md) |             | [optional] [default to undefined] |
| **response**                     | **string**                                                   |             | [optional] [default to undefined] |

## Example

```typescript
import { StringResponseWrapper } from "./api";

const instance: StringResponseWrapper = {
  status,
  authenticationFailureReasons,
  response,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
