import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "a80764aa-c133-432f-ac10-ef4b346d2d5b",
    authority:
      "https://login.microsoftonline.com/85368a70-b60b-474c-948b-0641cbd0b910",
    redirectUri: "/emails",
    postLogoutRedirectUri: "/login",
  },
  cache: {
    secureCookies: true,
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
