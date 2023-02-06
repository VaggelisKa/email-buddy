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
          <div className="flex flex-col gap-4">
            <article className="min-w-96 card min-h-[100px] bg-base-100 p-8 shadow-2xl">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-md font-semibold text-gray-200">
                    Evangelos Karavasileiadis
                  </span>
                  <span className="text-xl">Moodboard update</span>
                </div>
                <span className="text-sm italic text-gray-500">Just now</span>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Hi den! I have been thinking about one thing. Do you realise its
                so damn
              </p>
              <div className="mt-8 flex flex-row justify-end gap-2">
                <button className="btn-outline btn-sm btn">Read More</button>
                <button className="btn-primary btn-sm btn">Get Reply</button>
              </div>
            </article>
            <article className="min-w-96 card min-h-[100px] bg-base-100 p-8 shadow-2xl">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-md font-semibold text-gray-200">
                    Evangelos Karavasileiadis
                  </span>
                  <span className="text-xl">Moodboard update</span>
                </div>
                <span className="text-sm italic text-gray-500">Just now</span>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Hi den! I have been thinking about one thing. Do you realise its
                so damn
              </p>
              <div className="mt-8 flex flex-row justify-end gap-2">
                <button className="btn-outline btn-sm btn">Read More</button>
                <button className="btn-primary btn-sm btn">Get Reply</button>
              </div>
            </article>
            <article className="min-w-96 card min-h-[100px] bg-base-100 p-8 shadow-2xl">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-md font-semibold text-gray-200">
                    Evangelos Karavasileiadis
                  </span>
                  <span className="text-xl">Moodboard update</span>
                </div>
                <span className="text-sm italic text-gray-500">Just now</span>
              </div>
              <p className="mt-6 text-sm text-gray-400">
                Hi den! I have been thinking about one thing. Do you realise its
                so damn
              </p>
              <div className="mt-8 flex flex-row justify-end gap-2">
                <button className="btn-outline btn-sm btn">Read More</button>
                <button className="btn-primary btn-sm btn">Get Reply</button>
              </div>
            </article>
          </div>
        </Layout>
      </MsalAuthenticationTemplate>
    </>
  );
};

export default Emails;
