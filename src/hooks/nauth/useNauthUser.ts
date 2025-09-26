import { useContext } from "react";
import { NauthUserContext } from "./UserContext";

export default function useNauthUser() {
  const userSWR = useContext(NauthUserContext);

  if (userSWR === null) {
    throw new Error("useUser must be used within a UserProvider.");
  }

  const user = userSWR.data?.status === "Ok" ? (userSWR.data.response ?? null) : null;

  return {
    user,
    isLoading: userSWR.isLoading,
    refresh: userSWR.mutate,
  };
}
