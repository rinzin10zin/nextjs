import Layout from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Dit is de standaard title</title>
        <meta
          name="description"
          content="Dit is de standaard description, Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ea veritatis exercitationem fuga
          voluptatum quis suscipit, labore, placeat dolorum accusantium nulla
          voluptate officiis. Ex numquam assumenda blanditiis vel possimus rerum
          nulla."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
