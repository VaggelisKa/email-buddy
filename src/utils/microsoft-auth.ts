import { LogLevel } from "@azure/msal-browser";
import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "faa244bb-9342-43c3-806b-60b3cac23791",
    redirectUri: "/emails",
    postLogoutRedirectUri: "/login",
  },
  cache: {
    cacheLocation: "localStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (_, message) => {
        console.log(message);
      },
      logLevel: LogLevel.Warning,
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Mail.ReadBasic", "Mail.Read"],
};
