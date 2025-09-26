import { UserDTO } from "@/API/NAUTH/NauthApi_gen";

export const isAnyAdmin = (user: UserDTO | null | undefined) => {
  return user?.permissions?.some((p) => p?.permission?.key?.startsWith("PrAdmin")) ?? false;
};
