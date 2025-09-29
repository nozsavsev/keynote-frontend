import { NAUTH_API } from "@/API/NAUTH/API";
import { UserDTO } from "@/API/NAUTH/NauthApi_gen";
import useSWR from "swr";

type UserSWRData = Awaited<ReturnType<typeof NAUTH_API.Client.User.CurrentUser>>;

type useNauthUserInternalParams = {
  initialUser: UserDTO | null;
};

export default function useNauthUserInternal({ initialUser }: useNauthUserInternalParams) {
  const swrState = useSWR<UserSWRData>(
    "/api/user/current", // Stable SWR key
    () => NAUTH_API.Client.User.CurrentUser(), // Fetcher function
    {
      fallbackData: {
        status: initialUser === null ? "BadRequest" : "Ok",
        response: initialUser ?? undefined,
        authenticationFailureReasons: undefined,
      },
      revalidateOnMount: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 1000 * 5,
      refreshInterval: 0,
      keepPreviousData: true,
    },
  );

  return swrState;
}
