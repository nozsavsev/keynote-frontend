import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import { UserDTO } from "@/API/KEYNOTE/KeynoteApi_gen"; 
import useSWR from "swr";

type UserSWRData = Awaited<ReturnType<typeof KEYNOTE_API.Client.User.CurrentUser>>;

type useKeynoteUserInternalParams = {
  initialUser: UserDTO | null;
};

export default function useKeynoteUserInternal({ initialUser }: useKeynoteUserInternalParams) {
  const swrState = useSWR<UserSWRData>(
    "/api/keynote/user/current", // Stable SWR key
    () => KEYNOTE_API.Client.User.CurrentUser(), // Fetcher function
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

  return swrState;
}
