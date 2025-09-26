import { KEYNOTE_API } from "@/API/KEYNOTE/API";
import { createContext } from "react";
import { SWRResponse } from "swr";

export const KeynoteUserContext = createContext<SWRResponse<Awaited<ReturnType<typeof KEYNOTE_API.Client.User.CurrentUser>>, any> | null>(null);
