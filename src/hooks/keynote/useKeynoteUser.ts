import { useContext } from "react";
import { KeynoteUserContext } from "./KeynoteUserContext";

export default function useKeynoteUser() {
  const userSWR = useContext(KeynoteUserContext);

  if (userSWR === null) {
    throw new Error("useKeynoteUser must be used within a KeynoteUserProvider.");
  }

  const user = userSWR.data?.status === "Ok" ? (userSWR.data.response ?? null) : null;

  // Debug logging
  console.log("useKeynoteUser: userSWR =", userSWR);
  console.log("useKeynoteUser: userSWR.data =", userSWR.data);
  console.log("useKeynoteUser: userSWR.data?.response =", userSWR.data?.response);
  console.log("useKeynoteUser: extracted user =", user);
  console.log("useKeynoteUser: user type =", typeof user);
  console.log("useKeynoteUser: user keys =", user ? Object.keys(user) : "null");

  return {
    user,
    isLoading: userSWR.isLoading,
    refresh: userSWR.mutate,
  };
}
