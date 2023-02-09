import { EmailSubjectModal, Layout, Spinner } from "@/components";
import { InteractionType } from "@azure/msal-browser";
import type { NextPage } from "next";
import Head from "next/head";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { useFetchEmails } from "@/hooks";
import { createPortal } from "react-dom";

const Emails: NextPage = () => {
  const emails = useFetchEmails();

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
          {emails.isLoading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="pb-6 text-4xl font-medium">Choose an email</h1>
              <div className="flex flex-col gap-4">
                {emails.data?.value &&
                  emails.data.value.map((email) => {
                    createPortal(
                      <EmailSubjectModal subject={email.body.content} />,
                      document.body
                    );
                    return (
                      <article
                        key={email["@odata.etag"]}
                        className="min-w-96 card min-h-[100px] bg-base-100 p-8 shadow-2xl"
                      >
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col gap-2">
                            <span className="text-md font-semibold text-gray-200">
                              {email.from.emailAddress.name}
                            </span>
                            <span className="text-xl">{email.subject}</span>
                          </div>
                          <span className="text-sm italic text-gray-500">
                            Just now
                          </span>
                        </div>
                        <p className="mt-6 text-sm text-gray-400">
                          {email.bodyPreview.length >= 60
                            ? `${email.bodyPreview.slice(0, 60)}...`
                            : email.bodyPreview}
                        </p>
                        <div className="mt-8 flex flex-row justify-end gap-2">
                          <label
                            htmlFor="read-more-modal"
                            className="btn-outline btn-sm btn"
                            onClick={() => {
                              console.log(
                                document.querySelector("#modal-placeholder")
                              );
                            }}
                          >
                            Read More
                          </label>
                          <button className="btn-primary btn-sm btn">
                            Get Reply
                          </button>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </>
          )}
        </Layout>
      </MsalAuthenticationTemplate>
    </>
  );
};

export default Emails;
