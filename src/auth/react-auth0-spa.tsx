/**
 * Attribution and guide from Auth0:
 *
 * https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0
 */

import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  getIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  RedirectLoginResult,
} from '@auth0/auth0-spa-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Auth0ContextProps {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup(options: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(o: RedirectLoginOptions): Promise<void>;
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(o?: LogoutOptions): void;
}
interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback?(result: RedirectLoginResult): void;
}

const DEFAULT_REDIRECT_CALLBACK = (appState: any) =>
  window.history.replaceState(
    {},
    document.title,
    appState?.targetUrl || window.location.pathname
  );

export const Auth0Context = createContext<Auth0ContextProps | null>(null);
export const useAuth0 = () => useContext(Auth0Context)!;

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState<Auth0Client>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (o: PopupLoginOptions) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(o);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client!.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    return result;
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options) => auth0Client!.getIdTokenClaims(options),
        loginWithRedirect: (options) => auth0Client!.loginWithRedirect(options),
        getTokenSilently: (options) => auth0Client!.getTokenSilently(options),
        getTokenWithPopup: (options) => auth0Client!.getTokenWithPopup(options),
        logout: (options) => auth0Client!.logout(options),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
