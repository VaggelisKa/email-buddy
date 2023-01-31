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
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold">Next level emails!</h1>
              <p className="py-6">
                Empower your emails with advanced AI technology, ensuring
                efficient and personalized communication. Try the ChartGPT
                Powered Email App now!
              </p>
              <button className="btn-primary btn">Get Started</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
