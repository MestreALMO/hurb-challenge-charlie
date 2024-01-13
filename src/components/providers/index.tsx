import CtxCityStateProvider from "@/context/ctxCityState";
import CtxWeatherProvider from "@/context/ctxWeather";
import CtxForecastProvider from "@/context/ctxForecast";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CtxCityStateProvider>
        <CtxWeatherProvider>
          <CtxForecastProvider>{children}</CtxForecastProvider>
        </CtxWeatherProvider>
      </CtxCityStateProvider>
    </>
  );
};
