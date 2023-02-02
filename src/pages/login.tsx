import type { NextPage } from "next";
import Head from "next/head";

const Login: NextPage = () => {
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
            <button className="btn btn-primary btn-wide">MS Outlook</button>
            <button className="btn btn-wide" disabled>
              Gmail (soon)
            </button>
            <button className="btn btn-wide" disabled>
              Yahoo (soon)
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
