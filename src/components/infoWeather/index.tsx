import { useCtxForecast } from "@/context/ctxForecast";
import { useCtxWeather } from "@/context/ctxWeather";
import { useState } from "react";
import styles from "./infoWeather.module.css";
import svgSun from "@/icons/sun.svg";
import Image from "next/image";

export const InfoWeather: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { ctxWeather, setCtxWeather } = useCtxWeather();
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    useCtxForecast();

  return (
    <div className={`${styles.main}`}>
      {typeof ctxWeather?.main !== "undefined" && (
        <div>
          <div
            className={
              ctxWeather.main.temp < 15
                ? `${styles.todayWeatherBlue}`
                : ctxWeather.main.temp > 35
                ? `${styles.todayWeatherRed}`
                : `${styles.todayWeatherYellow}`
            }
          >
            <Image
              src={svgSun}
              alt="compass icon"
              className={`${styles.icon}`}
            />
            <div>
              <p>HOJE</p>
              <p>{ctxWeather.main.temp}ºC</p>
              <p>{ctxWeather.weather[0].description}</p>
              <p>Vento: NO {ctxWeather.wind.speed}km/h</p>
              <p>Humidade: {ctxWeather.main.humidity}%</p>
            </div>
          </div>

          {ctxTomorrow !== null && (
            <div
              className={
                ctxTomorrow < 15
                  ? `${styles.tomorrowWeatherBlue}`
                  : ctxTomorrow > 35
                  ? `${styles.tomorrowWeatherRed}`
                  : `${styles.tomorrowWeatherYellow}`
              }
            >
              <p>AMANHÃ</p>
              <p>{ctxTomorrow}ºC</p>
            </div>
          )}

          {ctxAfterTomorrow !== null && (
            <div
              className={
                ctxAfterTomorrow < 15
                  ? `${styles.afterTomorrowWeatherBlie}`
                  : ctxAfterTomorrow > 35
                  ? `${styles.afterTomorrowWeatherRed}`
                  : `${styles.afterTomorrowWeatherYellow}`
              }
            >
              <p>DEPOIS DE AMANHÃ</p>
              <p>{ctxAfterTomorrow}ºC</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
