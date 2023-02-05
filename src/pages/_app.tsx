import { type AppType } from "next/app";
import { api, msalConfig } from "@/utils";
import { MsalProvider } from "@azure/msal-react";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

export const msalInstance = new PublicClientApplication(msalConfig);

const userAccounts = msalInstance.getAllAccounts();
if (userAccounts?.length > 0) {
  msalInstance.setActiveAccount(userAccounts[0] ?? null);
}

msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    event.payload &&
    "account" in event.payload &&
    event.payload.account
  ) {
    msalInstance.setActiveAccount(event.payload.account);
  }
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </MsalProvider>
  );
};

export default api.withTRPC(MyApp);
