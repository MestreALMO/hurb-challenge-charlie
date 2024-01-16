import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { InfoInput } from "@/components/infoInput";
import { InfoWeather } from "@/components/infoWeather";

export default function Home() {
  return (
    <>
      <Head>
        <title>Charlie Challenge</title>
        <meta name="Hurb challenge" content="Charlie Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={`${styles.mainData}`}>
          <InfoInput />
          <InfoWeather />
        </div>
      </main>
    </>
  );
}
