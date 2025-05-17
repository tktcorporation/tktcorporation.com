import type { NextPage } from "next";
import Head from "next/head";
import { About } from "../about";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>About me</title>
        <meta
          name="description"
          content="Hi , I'm tkt. I'm a web application developer from Japan."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-200">
        <main className="container px-4 py-8">
          <About />
        </main>
        <footer className="mt-8 text-sm">
          © {new Date().getFullYear()} tkt
        </footer>
      </div>
    </>
  );
};

export default Home;
