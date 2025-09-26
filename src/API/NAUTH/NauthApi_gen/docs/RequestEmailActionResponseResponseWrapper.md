# RequestEmailActionResponseResponseWrapper

## Properties

| Name                             | Type                                                            | Description | Notes                             |
| -------------------------------- | --------------------------------------------------------------- | ----------- | --------------------------------- |
| **status**                       | [**WrResponseStatus**](WrResponseStatus.md)                     |             | [optional] [default to undefined] |
| **authenticationFailureReasons** | [**Array&lt;AuthFailureReasons&gt;**](AuthFailureReasons.md)    |             | [optional] [default to undefined] |
| **response**                     | [**RequestEmailActionResponse**](RequestEmailActionResponse.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { RequestEmailActionResponseResponseWrapper } from "./api";

const instance: RequestEmailActionResponseResponseWrapper = {
  status,
  authenticationFailureReasons,
  response,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
