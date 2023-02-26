import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "@/components";
import { UnauthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.cookies["isFirstTimeUser"];

  if (cookie && cookie === "false") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await router.push("/emails");
      }
    })();
  }, [isAuthenticated, router]);

  const handleClick = async () => {
    document.cookie = `isFirstTimeUser=false; SameSite=None; Secure; max-age=${
      60 * 60 * 24 * 60
    }}`;

    await router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Welcome - EmailBuddy</title>
        <meta name="description" content="Powered by Chat GPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UnauthenticatedTemplate>
          <h1 className="text-4xl font-bold">Next level emails!</h1>
          <p className="py-8">
            Empower your emails with advanced AI technology, ensuring efficient
            and personalized communication. Try the ChartGPT Powered Email App
            now!
          </p>
          <button className="btn-primary btn" onClick={handleClick}>
            Get Started
          </button>
        </UnauthenticatedTemplate>
      </Layout>
    </>
  );
};

export default Home;
