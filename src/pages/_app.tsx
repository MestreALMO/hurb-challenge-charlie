import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CtxCityStateProvider from "@/context/ctxCityState";
import CtxWeatherProvider from "@/context/ctxWeather";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CtxCityStateProvider>
        <CtxWeatherProvider>
          <Component {...pageProps} />
        </CtxWeatherProvider>
      </CtxCityStateProvider>
    </>
  );
}
