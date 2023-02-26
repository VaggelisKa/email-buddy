import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { EmailSubjectModal, Layout, Spinner } from "@/components";
import { InteractionType } from "@azure/msal-browser";
import Head from "next/head";
import {
  MsalAuthenticationTemplate,
  useIsAuthenticated,
} from "@azure/msal-react";
import { useFetchEmails } from "@/hooks";

const Emails: NextPage = () => {
  const [currentModal, setCurrentModal] = React.useState<{
    isOpen: boolean;
    subject: string;
    content: string;
  }>({ isOpen: false, subject: "", content: "" });
  const isAuthenticated = useIsAuthenticated();
  const emails = useFetchEmails(isAuthenticated);
  const router = useRouter();

  // This could be moved to the modal component
  React.useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setCurrentModal({ isOpen: false, subject: "", content: "" });
      }
    });

    if (currentModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.removeEventListener("keydown", () => {});
    };
  }, [currentModal]);

  const getEmailRelativeTime = (datestamp: string) => {
    const relativeTime = new Intl.RelativeTimeFormat("en", {
      localeMatcher: "best fit",
    });

    const timeagoMinutes = Math.floor(
      (new Date().getTime() - new Date(datestamp).getTime()) / 1000 / 60
    );

    if (timeagoMinutes <= 5) {
      return "Just now";
    }

    if (timeagoMinutes < 60) {
      return relativeTime.format(-timeagoMinutes, "minutes");
    }

    if (timeagoMinutes >= 60 && timeagoMinutes < 2 * 1440) {
      return relativeTime.format(-Math.floor(timeagoMinutes / 60), "hours");
    }

    return relativeTime.format(-Math.floor(timeagoMinutes / 1440), "days");
  };

  const handleGetReplyClick = async (subject: string) => {
    await router.push({
      pathname: "/reply",
      query: { subject: encodeURIComponent(subject) },
    });

    if (currentModal.isOpen) {
      setCurrentModal({ isOpen: false, subject: "", content: "" });
    }
  };

  return (
    <>
      <Head>
        <title>View Emails - EmailBuddy</title>
        <meta name="description" content="Choose an email to get a reply" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={{
          redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI || "/emails",
        }}
      >
        <Layout>
          {emails.isLoading ? (
            <Spinner />
          ) : (
            <>
              <h1 className="pb-6 text-3xl font-medium sm:text-4xl">
                Choose an email
                {emails.data?.["@odata.count"] && (
                  <span className="hidden text-xl sm:inline-block">{`(${emails.data?.["@odata.count"]} in total)`}</span>
                )}
              </h1>
              <div className="grid gap-4 md:grid-cols-2">
                {emails.data?.value &&
                  emails.data.value.map((email) => (
                    <article
                      key={email["@odata.etag"]}
                      className="card min-h-[100px] min-w-fit max-w-[40rem] justify-between bg-base-100 p-8 shadow-2xl"
                    >
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="text-md font-semibold text-gray-200">
                            {email.from.emailAddress.name}
                          </span>
                          <span className="text-xl">{email.subject}</span>
                        </div>
                        <span className="whitespace-nowrap text-sm italic text-gray-500">
                          {getEmailRelativeTime(email.receivedDateTime)}
                        </span>
                      </div>
                      <p className="mt-6 text-sm text-gray-400">
                        {email.bodyPreview.length >= 60
                          ? `${email.bodyPreview.slice(0, 60)}...`
                          : email.bodyPreview}
                      </p>
                      <div className="mt-8 flex flex-row justify-end gap-2">
                        <button
                          className="btn-outline btn-sm btn"
                          onClick={() => {
                            setCurrentModal({
                              isOpen: true,
                              subject: email.subject,
                              content: email.body.content,
                            });
                          }}
                        >
                          Read More
                        </button>
                        <button
                          className="btn-primary btn-sm btn"
                          onClick={() =>
                            handleGetReplyClick(email.body.content)
                          }
                        >
                          Get Reply
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
              {currentModal.isOpen && (
                <EmailSubjectModal
                  subject={currentModal.subject}
                  content={currentModal.content}
                  onGetReply={() => handleGetReplyClick(currentModal.content)}
                  onClose={() => {
                    setCurrentModal((prev) => ({ ...prev, isOpen: false }));
                  }}
                />
              )}
            </>
          )}
        </Layout>
      </MsalAuthenticationTemplate>
    </>
  );
};

export default Emails;
