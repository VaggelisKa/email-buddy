import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "@/utils";
import { Layout } from "@/components";
import { InteractionStatus } from "@azure/msal-browser";

const Login: NextPage = () => {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await router.push("/emails?provider=microsoft");
      }
    })();
  }, [isAuthenticated, router]);

  const handleMsLogin = async () => {
    try {
      const auth = await instance.loginPopup({
        scopes: loginRequest.scopes,
      });

      if (auth) {
        await router.push("/emails?provider=microsoft");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login - EmailBuddy</title>
        <meta name="description" content="Choose your email provider" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {!isAuthenticated && (
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
        )}
      </Layout>
    </>
  );
};

export default Login;
