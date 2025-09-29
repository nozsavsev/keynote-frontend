export const SecurityDescriptor: SecurityDescriptorType = {
  "/": [],
  "/403": [],
  "/404": [],
  "/500": [],
  "/account": ["AnyAuthenticated"],
  "/account/keynotes": ["AnyAuthenticated"],
  "/_app": [],
};
export type KeynotePaths = "/" | "/403" | "/404" | "/500" | "/account" | "/account/keynotes" | "/_app";

export type PageAccessRuleType = "AnyAdmin" | "AnyAuthenticated" | "RequireVerifiedEmail" | "PrAdminManageKeynotes" | "PrUploadFiles";

export type SecurityDescriptorType = { [K in KeynotePaths]: PageAccessRuleType[] };
