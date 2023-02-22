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

    const response = await generateReplyMutation.mutateAsync({
      subject: subjectTextRef.current.value,
      manner: mannerSelectRef.current.value,
      name: instance.getActiveAccount()?.name,
    });

    console.log(response);
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
      </Layout>
    </>
  );
};

export default Reply;
