import { type AppType } from "next/app";
import { api, msalConfig } from "@/utils";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import "../styles/globals.css";

const msalInstance = new PublicClientApplication(msalConfig);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <Component {...pageProps} />
    </MsalProvider>
  );
};

export default api.withTRPC(MyApp);
