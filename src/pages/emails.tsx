import { Layout } from "@/components";
import { InteractionType } from "@azure/msal-browser";
import type { NextPage } from "next";
import Head from "next/head";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { useFetchEmails } from "@/hooks";

const Emails: NextPage = () => {
  const emails = useFetchEmails();

  console.log(emails?.data);

  return (
    <>
      <Head>
        <title>View Emails - EmailBuddy</title>
        <meta name="description" content="Choose an email to get a reply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={{ redirectUri: "/emails?provider=microsoft" }}
      >
        <Layout>
          <h1 className="pb-6 text-4xl font-medium">Choose an email</h1>
        </Layout>
      </MsalAuthenticationTemplate>
    </>
  );
};

export default Emails;
