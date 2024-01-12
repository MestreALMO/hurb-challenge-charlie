import "@/styles/globals.css";
import type { AppProps } from "next/app";
import CtxCityStateProvider from "@/context/ctxCityState";
import CtxWeatherProvider from "@/context/ctxWeather";
import CtxForecastProvider from "@/context/ctxForecast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CtxCityStateProvider>
        <CtxWeatherProvider>
          <CtxForecastProvider>
            <Component {...pageProps} />
          </CtxForecastProvider>
        </CtxWeatherProvider>
      </CtxCityStateProvider>
    </>
  );
}
