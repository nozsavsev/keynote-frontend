"use client"
// Core imports
import App, { type AppContext, type AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as cookie from "cookie";

// API imports
import { NAUTH_API } from "@/API/NAUTH/API";
import { UserDTO } from "@/API/NAUTH/NauthApi_gen";
import { KEYNOTE_API } from "@/API/KEYNOTE/API";

// Component imports
import Layout from "@/components/layout/layout";

// Hook imports
import { NauthRealtimeProvider, useNauthRealtime } from "@/hooks/nauth/NauthRealtimeContext";
import { NauthUserContext } from "@/hooks/nauth/UserContext";
import { KeynoteUserContext } from "@/hooks/keynote/KeynoteUserContext";
import useDevConsoleWarning from "@/hooks/useDevConsoleWarning";
import useNauthUser from "@/hooks/nauth/useNauthUser";
import useNauthUserInternal from "@/hooks/nauth/useNauthUserInternal";
import useKeynoteUserInternal from "@/hooks/keynote/useKeynoteUserInternal";

// Style imports
import "@/styles/globals.css";

// External imports
import { ToastContainer } from "react-toastify";
import { KeynoteRealtimeProvider, usePresentorHub, useScreenHub, useSpectatorHub } from "@/hooks/keynote/keynoteRealtime";
import { KeynoteUserDTO } from "@/API/KEYNOTE/KeynoteApi_gen";

// ============================================================================
// Types and Configuration
// ============================================================================

type AppENVConfigType = {
  NAUTH_API_BASE: string;
  NAUTH_API_BASE_SSR: string;
  NAUTH_API_BASE_REALTIME: string;
  API_BASE: string;
  API_BASE_SSR: string;
  API_BASE_REALTIME: string;
  NAUTH_FRONTEND_BASE: string;
  CURRENT_FRONTEND_BASE: string;
};

export const AppENVConfig: AppENVConfigType = {
  NAUTH_API_BASE: process.env.NAUTH_API_BASE!,
  NAUTH_API_BASE_SSR: process.env.NAUTH_API_BASE_SSR!,
  NAUTH_API_BASE_REALTIME: process.env.NAUTH_API_BASE_REALTIME!,
  API_BASE: process.env.API_BASE!,
  API_BASE_SSR: process.env.API_BASE_SSR!,
  API_BASE_REALTIME: process.env.API_BASE_REALTIME!,
  NAUTH_FRONTEND_BASE: process.env.NAUTH_FRONTEND_BASE!,
  CURRENT_FRONTEND_BASE: process.env.CURRENT_FRONTEND_BASE!,
};

type PageProps = {
  ssr_user: UserDTO | null | undefined;
  ssr_keynote_user: KeynoteUserDTO | null | undefined;
  securityPage?: boolean | undefined;
  clientConfig: AppENVConfigType;
};

type AppPropsWithSSRUser = AppProps<PageProps>;

// ============================================================================
// Utility Functions
// ============================================================================

const getDefaultPageProps = (isSSR: boolean = true): PageProps => ({
  ssr_user: isSSR ? null : undefined,
  ssr_keynote_user: isSSR ? null : undefined,
  securityPage: isSSR ? false : undefined,
  clientConfig: isSSR ? {
    API_BASE: process.env.API_BASE!,
    API_BASE_SSR: process.env.API_BASE_SSR!,
    API_BASE_REALTIME: process.env.API_BASE_REALTIME!,
    NAUTH_API_BASE: process.env.NAUTH_API_BASE!,
    NAUTH_API_BASE_SSR: process.env.NAUTH_API_BASE_SSR!,
    NAUTH_API_BASE_REALTIME: process.env.NAUTH_API_BASE_REALTIME!,
    NAUTH_FRONTEND_BASE: process.env.NAUTH_FRONTEND_BASE!,
    CURRENT_FRONTEND_BASE: process.env.CURRENT_FRONTEND_BASE!,
  } : {
    API_BASE: AppENVConfig.API_BASE,
    API_BASE_SSR: AppENVConfig.API_BASE_SSR,
    API_BASE_REALTIME: AppENVConfig.API_BASE_REALTIME,
    NAUTH_API_BASE: AppENVConfig.NAUTH_API_BASE,
    NAUTH_API_BASE_SSR: AppENVConfig.NAUTH_API_BASE_SSR,
    NAUTH_API_BASE_REALTIME: AppENVConfig.NAUTH_API_BASE_REALTIME,
    NAUTH_FRONTEND_BASE: AppENVConfig.NAUTH_FRONTEND_BASE,
    CURRENT_FRONTEND_BASE: AppENVConfig.CURRENT_FRONTEND_BASE,
  },
});

const hydrateClientConfig = (clientConfig: AppENVConfigType) => {
  AppENVConfig.API_BASE = clientConfig.API_BASE;
  AppENVConfig.API_BASE_SSR = clientConfig.API_BASE_SSR;
  AppENVConfig.API_BASE_REALTIME = clientConfig.API_BASE_REALTIME;
  AppENVConfig.NAUTH_API_BASE = clientConfig.NAUTH_API_BASE;
  AppENVConfig.NAUTH_API_BASE_SSR = clientConfig.NAUTH_API_BASE_SSR;
  AppENVConfig.NAUTH_API_BASE_REALTIME = clientConfig.NAUTH_API_BASE_REALTIME;
  AppENVConfig.NAUTH_FRONTEND_BASE = clientConfig.NAUTH_FRONTEND_BASE;
  AppENVConfig.CURRENT_FRONTEND_BASE = clientConfig.CURRENT_FRONTEND_BASE;
};

// ============================================================================
// SSR User Fetching
// ============================================================================

const fetchNauthUser = async (token: string) => {
  const userResponse = await NAUTH_API.SSR.User.CurrentUser({ token });
  return userResponse?.status === "Ok" ? userResponse?.response : null;
};

const fetchKeynoteUser = async (token: string) => {
  const keynoteUserResponse = await KEYNOTE_API.SSR.User.CurrentUser({ token });
  return keynoteUserResponse?.status === "Ok" ? keynoteUserResponse?.response : null;
};

const handleAuthRedirect = (
  userResponse: any,
  appContext: AppContext
): boolean => {
  if (
    userResponse?.status === "Forbidden" &&
    (userResponse?.authenticationFailureReasons as string[])?.includes("_2FARequired") &&
    !appContext.ctx.pathname.includes("/auth/2FA")
  ) {
    const currentUrl = process.env.CURRENT_FRONTEND_BASE + appContext.ctx.pathname + (appContext.ctx.query ? '?' + new URLSearchParams(appContext.ctx.query as Record<string, string>).toString() : '');
    appContext?.ctx?.res?.writeHead(302, {
      Location: new URL(
        "/auth/2FA?redirect=" + encodeURIComponent(currentUrl),
        process.env.NAUTH_FRONTEND_BASE!
      ).toString(),
    });
    appContext?.ctx?.res?.end();
    return true;
  }
  return false;
};

// ============================================================================
// Components
// ============================================================================

const AppHead = () => (
  <Head>
    <title>Keyn0te</title>
    <link rel="icon" href="/faviconDark.svg" />
    <meta name="description" content="A secure and modern authentication platform." />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Keyn0te" />
    <meta property="og:description" content="A secure and modern authentication platform." />
    <meta property="og:site_name" content="Keyn0te" />
    <meta property="og:image" content="/banner_dark.svg" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:title" content="Keyn0te" />
    <meta property="twitter:description" content="A secure and modern authentication platform." />
    <meta property="twitter:image" content="/banner_dark.svg" />
  </Head>
);

const AppToastContainer = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
  />
);

const AppProviders = ({ 
  children, 
  nauthUser, 
  keynoteUser 
}: { 
  children: React.ReactNode;
  nauthUser: any;
  keynoteUser: any;
}) => (
  <NauthUserContext.Provider value={nauthUser}>
    <KeynoteUserContext.Provider value={keynoteUser}>
      <NauthRealtimeProvider>
        <KeynoteRealtimeProvider>
          {children}
        </KeynoteRealtimeProvider>
      </NauthRealtimeProvider>
    </KeynoteUserContext.Provider>
  </NauthUserContext.Provider>
);

const InnerApp = ({ Component, pageProps }: AppPropsWithSSRUser) => {
  const { user, refresh } = useNauthUser();
  const realtime = useNauthRealtime();
  
  useEffect(() => {
    if (user) {
      realtime.connect();
      realtime.RefreshData = refresh;
    } else {
      realtime.disconnect();
    }

    return () => {
      realtime.disconnect();
    };
  }, [user?.id, realtime, refresh]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

const AppWithProviders = (props: AppPropsWithSSRUser) => {
  const nauthUser = useNauthUserInternal({ 
    initialUser: props.pageProps.ssr_user ?? null 
  });
  const keynoteUser = useKeynoteUserInternal({ 
    initialUser: props.pageProps.ssr_keynote_user ?? null 
  });

  // Debug logging
  console.log("AppWithProviders: nauthUser =", nauthUser);
  console.log("AppWithProviders: keynoteUser =", keynoteUser);
  console.log("AppWithProviders: keynoteUser.data =", keynoteUser.data);

  useDevConsoleWarning();

  return (
    <>
      <AppProviders nauthUser={nauthUser} keynoteUser={keynoteUser}>
        <AppHead />
        <InnerApp {...props} />
      </AppProviders>
      <AppToastContainer />
    </>
  );
};

const ClientConfigHydrator = (appProps: AppPropsWithSSRUser) => {
  const { clientConfig } = appProps.pageProps;
  hydrateClientConfig(clientConfig);
  return <AppWithProviders {...appProps} />;
};

// ============================================================================
// Main App Component
// ============================================================================

const MyApp: any = ClientConfigHydrator;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.req) {
    // Server-side rendering
    const response = getDefaultPageProps(true);
    response.securityPage = appContext.ctx.pathname.includes("/account");

    const cookies = cookie.parse((appContext.ctx.req as any)?.headers?.cookie || "");
    const authToken = cookies.nauth ?? "";

    try {
      // Fetch Nauth user
      const nauthUser = await fetchNauthUser(authToken);
      response.ssr_user = nauthUser;

      // Handle auth redirects
      const nauthUserResponse = await NAUTH_API.SSR.User.CurrentUser({ token: authToken });
      if (handleAuthRedirect(nauthUserResponse, appContext)) {
        return {};
      }

      // Fetch Keynote user
      const keynoteUser = await fetchKeynoteUser(authToken);
      response.ssr_keynote_user = keynoteUser;

    } catch (error) {
      console.error("Error fetching user data:", error);
      // Continue with null users if API fails
    }

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        ...response,
      },
    };
  } else {
    // Client-side rendering
    const response = getDefaultPageProps(false);

    return {
      ...appProps,
      pageProps: {
        ...response,
        ...appProps.pageProps,
      },
    };
  }
};

export default MyApp;