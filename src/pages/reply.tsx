/* eslint-disable @typescript-eslint/require-await */
import { Layout } from "@/components";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

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
        <h1 className="pb-6 text-4xl font-medium">Generate a reply!</h1>
        <div>{subject}</div>
      </Layout>
    </>
  );
};

export default Reply;
