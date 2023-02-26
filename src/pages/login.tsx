import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "@/utils";
import { Layout } from "@/components";

const Login: NextPage = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await router.push(msalConfig.auth.redirectUri || "/emails");
      }
    })();
  }, [isAuthenticated, router]);

  const handleMsLogin = async () => {
    try {
      await instance.loginRedirect({
        scopes: loginRequest.scopes,
      });

      await router.push(msalConfig.auth.redirectUri || "/emails");
    } catch {}
  };

  return (
    <>
      <Head>
        <title>Login - EmailBuddy</title>
        <meta name="description" content="Choose your email provider" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UnauthenticatedTemplate>
          <div className="card flex h-full w-96 flex-col items-center bg-base-100 p-16 shadow-xl">
            <h1 className="pb-6 text-4xl font-medium">Login</h1>
            <div className="flex flex-col gap-4">
              <button
                className={`btn-primary btn-wide btn ${
                  inProgress === InteractionStatus.Login ? "loading" : ""
                }`}
                onClick={handleMsLogin}
              >
                MS Outlook
              </button>
              <button className="btn-wide btn normal-case" disabled>
                GMAIL (soon!)
              </button>
            </div>
          </div>
        </UnauthenticatedTemplate>
      </Layout>
    </>
  );
};

export default Login;
