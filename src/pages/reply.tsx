/* eslint-disable @typescript-eslint/require-await */
import React from "react";
import { useRouter } from "next/router";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { api } from "@/utils";
import { Layout } from "@/components";
import { useMsal } from "@azure/msal-react";
import { BiCopy } from "react-icons/bi";

export const getServerSideProps: GetServerSideProps<{
  subject: string;
}> = async (ctx) => {
  const subject = ctx.query?.subject;

  if (!subject || !subject.length) {
    return {
      redirect: {
        destination: "/emails",
        permanent: false,
      },
    };
  }

  return {
    props: {
      subject: decodeURIComponent(subject as string),
    },
  };
};

const Reply: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ subject }) => {
  const subjectTextRef = React.useRef<HTMLTextAreaElement>(null);
  const mannerSelectRef = React.useRef<HTMLSelectElement>(null);
  const router = useRouter();
  const { instance } = useMsal();
  const generateReplyMutation = api.chatGpt.generateReply.useMutation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subjectTextRef.current?.value || !mannerSelectRef.current?.value) {
      return;
    }

    generateReplyMutation.mutate({
      subject: subjectTextRef.current.value,
      manner: mannerSelectRef.current.value,
      name: instance.getActiveAccount()?.name,
    });
  };

  return (
    <>
      <Head>
        <title>Generate Reply - EmailBuddy</title>
        <meta
          name="description"
          content="Generate an automated reply for your email"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {generateReplyMutation.data &&
        generateReplyMutation.data.choices[0]?.text ? (
          <ReplyTemplate reply={generateReplyMutation.data.choices[0]?.text} />
        ) : (
          <>
            <h1 className="pb-10 text-4xl font-medium">Generate a reply!</h1>
            <form
              className="flex w-full max-w-lg flex-col gap-12"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="form-control">
                <label htmlFor="subject-text" className="label">
                  <span className="label-text">Subject to reply</span>
                  <span className=" label-text-alt">Edit if you need</span>
                </label>
                <textarea
                  ref={subjectTextRef}
                  id="subject-text"
                  className="textarea-bordered textarea h-28 w-full"
                  placeholder="Subject to reply to here"
                  defaultValue={subject}
                  required
                  aria-required
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="manner-select" className="label">
                  <span className="label-text">Choose manner</span>
                </label>
                <select
                  ref={mannerSelectRef}
                  id="manner-select"
                  className="select-bordered select"
                  defaultValue="formal"
                  required
                >
                  <option value="formal">Formal</option>
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="funny">Funny</option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="btn-outline btn"
                  type="button"
                  onClick={router.back}
                >
                  Back to emails
                </button>
                <button className=" btn-primary btn" type="submit">
                  Generate
                </button>
              </div>
            </form>
          </>
        )}
      </Layout>
    </>
  );
};

function ReplyTemplate({ reply }: { reply: string }) {
  const router = useRouter();

  return (
    <>
      <h1 className="pb-10 text-4xl font-medium">View reply</h1>
      <div className="mockup-window mb-6 w-full max-w-2xl border bg-base-300">
        <div className="flex flex-col gap-4 bg-base-200 px-4 pt-12 pb-6">
          <div className="chat chat-end w-full">
            <p className="chat-bubble whitespace-pre-wrap">
              Please generate a reply for me!
            </p>
          </div>
          <div className="chat chat-start w-full">
            <p className="chat-bubble chat-bubble-primary whitespace-pre-wrap">
              <BiCopy
                role="button"
                aria-label="copy to clipboard"
                className="float-right h-6 w-6 hover:opacity-40"
              />
              {reply}
            </p>
          </div>
          <div className="chat chat-start w-full">
            <div className="chat-bubble flex flex-col gap-2 whitespace-pre-wrap md:flex-row">
              <button
                className="btn-accent btn-sm btn"
                onClick={() => router.replace("/emails")}
              >
                Back To Emails
              </button>
              <button className="btn-secondary btn-sm btn">Try Again</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reply;
