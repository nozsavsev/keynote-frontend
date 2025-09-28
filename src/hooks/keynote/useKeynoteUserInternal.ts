import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import { KeynoteUserDTO } from "@/API/KEYNOTE/KeynoteApi_gen"; 
import useSWR from "swr";

type UserSWRData = Awaited<ReturnType<typeof KEYNOTE_API.Client.User.CurrentUser>>;

type useKeynoteUserInternalParams = {
  initialUser: KeynoteUserDTO | null;
};

export default function useKeynoteUserInternal({ initialUser }: useKeynoteUserInternalParams) {
  const swrState = useSWR<UserSWRData>(
    "/api/keynote/user/current", // Stable SWR key
    async () => {
      console.log("useKeynoteUserInternal: Calling KEYNOTE_API.Client.User.CurrentUser()");
      const result = await KEYNOTE_API.Client.User.CurrentUser();
      console.log("useKeynoteUserInternal: API result =", result);
      return result;
    },
    {
      fallbackData: {
        status: initialUser === null ? "BadRequest" : "Ok",
        response: initialUser ?? undefined,
        authenticationFailureReasons: undefined,
      },
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 1000 * 5,
      refreshInterval: 0,
      keepPreviousData: true,
    },
  );

  console.log("useKeynoteUserInternal: swrState.data =", swrState.data);
  return swrState;
}
