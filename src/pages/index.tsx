import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "@/components";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;

  if (cookies && cookies.includes("isFirstTimeUser=false")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const router = useRouter();

  const handleClick = async () => {
    document.cookie = "isFirstTimeUser=false; SameSite=None; Secure";

    await router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Email Buddy</title>
        <meta name="description" content="Powered by Chat GPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold">Next level emails!</h1>
              <p className="py-6">
                Empower your emails with advanced AI technology, ensuring
                efficient and personalized communication. Try the ChartGPT
                Powered Email App now!
              </p>
              <button className="btn-primary btn" onClick={handleClick}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
