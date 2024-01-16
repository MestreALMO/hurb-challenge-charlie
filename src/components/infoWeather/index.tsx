import { useCtxCityState } from "@/context/ctxCityState";
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
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    useCtxForecast();

  return (
    <div className={`${styles.main}`}>
      {typeof ctxWeather?.main !== "undefined" && (
        <div>
          <div>
            <Image
              src={svgSun}
              alt="compass icon"
              className={`${styles.icon}`}
            />
            <div className={`${styles.weatherToday}`}>
              <p>HOJE</p>
              <p>{ctxWeather.main.temp}ºC</p>
              <p>{ctxWeather.weather[0].description}</p>
              <p>Vento: {ctxWeather.wind.speed}km/h</p>
              <p>Humidade: {ctxWeather.main.humidity}%</p>
            </div>
          </div>
          <div>
            <p>AMANHÃ</p>
            <p>{ctxTomorrow}ºC</p>
          </div>
          <div>
            <p>DEPOIS DE AMANHÃ</p>
            <p>{ctxAfterTomorrow}ºC</p>
          </div>
        </div>
      )}
    </div>
  );
};
