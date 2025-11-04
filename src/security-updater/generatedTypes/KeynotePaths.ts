export const SecurityDescriptor: SecurityDescriptorType = {
  '/': [],
  '/403': [],
  '/404': [],
  '/500': [],
  '/account': ['AnyAuthenticated' ],
  '/account/keynotes': ['AnyAuthenticated' ],
  '/present': ['AnyAuthenticated'],
  '/screen': [],
  '/spectate': [],
  '/_app': [],
}
export type KeynotePaths = 
  | '/'
  | '/403'
  | '/404'
  | '/500'
  | '/account'
  | '/account/keynotes'
  | '/present'
  | '/screen'
  | '/spectate'
  | '/_app';                                                                         
                                                
export type PageAccessRuleType = 
  | 'AnyAdmin'
  | 'AnyAuthenticated'
  | 'RequireVerifiedEmail'
  | 'PrAdminManageKeynotes'
  | 'PrUploadFiles'

export type SecurityDescriptorType = { [K in KeynotePaths]: PageAccessRuleType[]; };
