const STORAGE_KEY = {
  loginRedirect: "login-redirect",
};

export const useNavigationStore = () => {
  return {
    setLoginRedirectRoute(route: string) {
      sessionStorage.setItem(STORAGE_KEY.loginRedirect, route);
    },
    getLoginRedirectRoute() {
      const route = sessionStorage.getItem(STORAGE_KEY.loginRedirect);
      sessionStorage.removeItem(STORAGE_KEY.loginRedirect);
      return route;
    },
  };
};
