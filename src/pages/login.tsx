import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/utils";

const Login: NextPage = () => {
  const { instance, inProgress } = useMsal();
  const router = useRouter();

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
        <title>Login</title>
        <meta name="description" content="Choose your email provider" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="card flex h-full w-96 flex-col items-center bg-base-100 p-16 shadow-xl">
          <h1 className="pb-6 text-4xl font-medium">Login</h1>
          <div className="flex flex-col gap-4">
            <button
              className={`btn-primary btn-wide btn ${
                inProgress === "login" ? "loading" : ""
              }`}
              onClick={handleMsLogin}
            >
              MS Outlook
            </button>
            <button className="btn-wide btn" disabled>
              Gmail (soon)
            </button>
            <button className="btn-wide btn" disabled>
              Yahoo (soon)
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
