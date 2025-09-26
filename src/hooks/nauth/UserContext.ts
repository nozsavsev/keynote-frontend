import { NAUTH_API } from "@/API/NAUTH/API";
import { createContext } from "react";
import { SWRResponse } from "swr";

export const NauthUserContext = createContext<SWRResponse<Awaited<ReturnType<typeof NAUTH_API.Client.User.CurrentUser>>, any> | null>(null);
