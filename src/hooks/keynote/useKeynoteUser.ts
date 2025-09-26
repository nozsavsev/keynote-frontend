import { useContext } from "react";
import { KeynoteUserContext } from "./KeynoteUserContext";

export default function useKeynoteUser() {
  const userSWR = useContext(KeynoteUserContext);

  if (userSWR === null) {
    throw new Error("useKeynoteUser must be used within a KeynoteUserProvider.");
  }

  const user = userSWR.data?.status === "Ok" ? (userSWR.data.response ?? null) : null;

  return {
    user,
    isLoading: userSWR.isLoading,
    refresh: userSWR.mutate,
  };
}
