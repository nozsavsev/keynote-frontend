import { AppENVConfig } from "@/pages/_app";
import * as  KeynoteApi from "./KeynoteApi_gen";
import { UserControllerClient } from "./Client/UserController";
import { StatusControllerClient } from "./Client/StatusController";
import { KeynoteControllerClient } from "./Client/KeynoteController";
import { SessionControllerClient } from "./Client/SessionController";
import { UserControllerSSR } from "../NAUTH/SSR/UserControllerSSR";
import { SessionControllerSSR } from "../NAUTH/SSR/SessionControllerSSR";
import { StatusControllerSSR } from "./SSR/StatusControllerSSR";
import { KeynoteControllerSSR } from "./SSR/KeynoteControllerSSR";
const dev = process.env.NODE_ENV !== "production";


export const GetDefaultConfig = () => {
  return new KeynoteApi.Configuration({
    credentials: "include",
    basePath: AppENVConfig.API_BASE!,
  });
};

export type SSRConfigParameters = {
  token: string;
  useProcessEnv?: boolean;
};

export const GetSSRDefaultConfig = (params: SSRConfigParameters) => {
  // Use process.env directly in middleware context, AppENVConfig in other SSR contexts
  const basePath = params.useProcessEnv ? process.env.API_BASE_SSR! : AppENVConfig.API_BASE_SSR!;
  
  return new KeynoteApi.Configuration({
    credentials: "include",
    basePath: basePath,
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });
};

function hydrateDateTimeObjects(obj: any) {
  const visited = new WeakSet();

  const recurse = (currentObj: any) => {
    if (currentObj === null || typeof currentObj !== "object") {
      return;
    }

    if (visited.has(currentObj)) {
      return;
    }
    visited.add(currentObj);

    // This handles both arrays and objects
    for (const key in currentObj) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: We need to check for own properties
      if (!currentObj.hasOwnProperty(key)) {
        continue;
      }

      const value = currentObj[key];
      if (typeof value === "string") {
        // Regex to check for ISO 8601 format. This is not perfect, but it's a good heuristic.
        // It looks for YYYY-MM-DDTHH:MM:SS format, with optional milliseconds and timezone.
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))?$/;
        if (iso8601Regex.test(value)) {
          const parsedDate = new Date(value);
          // Check if the date is valid. `new Date()` can return 'Invalid Date' which is a Date object whose time value is NaN.
          if (!isNaN(parsedDate.getTime())) {
            currentObj[key] = parsedDate;
          } else {
            currentObj[key] = new Date();
          }
        }
      } else if (typeof value === "object" && value !== null) {
        recurse(value);
      }
    }
  };

  recurse(obj);
}

export const ExecuteApiRequest = async <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): Promise<
  | ReturnType<T>
  | {
      status: "ServerDown";
      response: null;
      authenticationFailureReasons: KeynoteApi.AuthFailureReasons[];
    }
> => {
  try {
    // Extract function name for logging
    const functionName = fn.name || 'unknown';
    const apiPath = functionName.replace(/^api/, '').replace(/([A-Z])/g, '/$1').toLowerCase().replace(/^\//, '');
    
    
    hydrateDateTimeObjects(args);
    let res = await fn(...args);
    hydrateDateTimeObjects(res);
    
    return res;
  } catch (e: any) {
    const functionName = fn.name || 'unknown';
    const apiPath = functionName.replace(/^api/, '').replace(/([A-Z])/g, '/$1').toLowerCase().replace(/^\//, '');
    

    try {
      const payload: KeynoteApi.StringResponseWrapper =
        (await e.response?.json()) ||
        ({
          status: "ServerDown",
          response: null,
          authenticationFailureReasons: [],
        } as KeynoteApi.StringResponseWrapper);

      if (
        typeof window !== "undefined" &&
        //@ts-ignore
        !window.noRedirects
      ) {
        //process client only redirects

        if (payload.status === "Forbidden") {
          console.log(payload);

          if (!window.location.pathname.includes("/auth/2FA") && payload?.authenticationFailureReasons?.includes("_2FARequired")) {
            const currentUrl = window.location.origin + window.location.pathname + window.location.search;
            window.location.href = new URL(`/auth/2FA?redirect=${encodeURIComponent(currentUrl)}`, AppENVConfig.NAUTH_FRONTEND_BASE).toString();
          } else if (!window.location.pathname.includes("/auth/") && payload?.authenticationFailureReasons?.includes("SessionExpired") == false) {
            const currentUrl = window.location.origin + window.location.pathname + window.location.search;
            window.location.href = new URL(`/auth/verificationExplainer?required=${payload?.authenticationFailureReasons?.join(",")}&redirect=${encodeURIComponent(currentUrl)}`, AppENVConfig.NAUTH_FRONTEND_BASE).toString();
          }
        }
        
        if (payload.status === "ServerDown" && !window.location.pathname.includes("/500")) {
          const currentUrl = window.location.origin + window.location.pathname + window.location.search;
          window.location.href = "/500?redirect=" + encodeURIComponent(currentUrl);
        }
      }

      return payload as any;
    } catch (_e) {
      if (typeof window !== "undefined" && !window.location.pathname.includes("/500")) {
        const currentUrl = window.location.origin + window.location.pathname + window.location.search;
        window.location.href = "/500?redirect=" + encodeURIComponent(currentUrl);
      }

      return {
        status: "ServerDown",
        response: null,
        authenticationFailureReasons: [],
      };
    }
  }
};

class Client_API {
 

  public get User(): UserControllerClient {
    return new UserControllerClient();
  }

  public get ServerStatus(): StatusControllerClient {
    return new StatusControllerClient();
  }

  public get Keynote(): KeynoteControllerClient {
    return new KeynoteControllerClient();
  }

  public get Session(): SessionControllerClient {
    return new SessionControllerClient();
  }
  
}

class SSR_API {
  public get User(): UserControllerSSR {
    return new UserControllerSSR();
  }

  public get Status(): StatusControllerSSR {
    return new StatusControllerSSR();
  }

  public get Session(): SessionControllerSSR {
    return new SessionControllerSSR();
  }

  public get Keynote(): KeynoteControllerSSR {
    return new KeynoteControllerSSR();
  }
  
}

export class KEYNOTE_API {
  public static readonly SSR = new SSR_API();
  public static readonly Client = new Client_API();
}
