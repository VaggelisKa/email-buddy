import { Layout } from "@/components";
import type { NextPage } from "next";
import Head from "next/head";

const Emails: NextPage = () => {
  return (
    <>
      <Head>
        <title>View Emails - EmailBuddy</title>
        <meta name="description" content="Choose an email to get a reply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="pb-6 text-4xl font-medium">Choose an email</h1>
      </Layout>
    </>
  );
};

export default Emails;
