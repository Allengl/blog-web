import "@/styles/globals.scss";
import "@/styles/utils.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Container } from "react-bootstrap";
import style from "@/styles/App.module.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NextNProgress from "nextjs-progressbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>时光印迹 -- 分享你的观点</title>
        <meta name="description" content="A full-stack Nextjs app byAllengl" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <NextNProgress color="#21fa90" />
        <NavBar />
        <main>
          <Container className={style.pageContainer}>
            <Component {...pageProps} />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
