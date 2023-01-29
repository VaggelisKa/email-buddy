import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Email Buddy</title>
        <meta name="description" content="Powered by Chat GPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>Some content</div>
      </main>
    </>
  );
};

export default Home;
