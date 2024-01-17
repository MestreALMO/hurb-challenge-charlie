import { useCtxForecast } from "@/context/ctxForecast";
import { useCtxWeather } from "@/context/ctxWeather";
import styles from "./infoWeather.module.css";
import svgSun from "@/icons/sun.svg";
import Image from "next/image";

export const InfoWeather: React.FC = () => {
  const { ctxWeather, setCtxWeather } = useCtxWeather();
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    useCtxForecast();

  return (
    <div className={`${styles.main}`}>
      {typeof ctxWeather?.main !== "undefined" && (
        <div>
          <div
            className={`${styles.dayData} 
              ${
                ctxWeather.main.temp < 15
                  ? `${styles.todayWeatherBlue}`
                  : ctxWeather.main.temp > 35
                  ? `${styles.todayWeatherRed}`
                  : `${styles.todayWeatherYellow}`
              }`}
          >
            <div className={`${styles.imgBlock}`}>
              <Image
                src={svgSun}
                alt="compass icon"
                className={`${styles.icon}`}
              />
            </div>
            <div className={`${styles.todayInfo}`}>
              <p>HOJE</p>
              <p>{ctxWeather.main.temp}ºC</p>
              <p className={`${styles.todayDescription}`}>
                {ctxWeather.weather[0].description.charAt(0).toUpperCase() +
                  ctxWeather.weather[0].description.slice(1)}
              </p>
              <p>Vento: NO {ctxWeather.wind.speed}km/h</p>
              <p>Humidade: {ctxWeather.main.humidity}%</p>
            </div>
          </div>

          {ctxTomorrow !== null && (
            <div
              className={`${styles.tomorrowData} ${
                ctxTomorrow < 15
                  ? `${styles.tomorrowWeatherBlue}`
                  : ctxTomorrow > 35
                  ? `${styles.tomorrowWeatherRed}`
                  : `${styles.tomorrowWeatherYellow}`
              }`}
            >
              <div className={`${styles.dayData}`}>
                <div className={`${styles.infoSides}`}>&nbsp;</div>
                <div className={`${styles.infoSides}`}>
                  <p>AMANHÃ</p>
                  <p>{ctxTomorrow}ºC</p>
                </div>
              </div>
            </div>
          )}

          {ctxAfterTomorrow !== null && (
            <div
              className={`${styles.dayData} ${
                ctxAfterTomorrow < 15
                  ? `${styles.afterTomorrowWeatherBlie}`
                  : ctxAfterTomorrow > 35
                  ? `${styles.afterTomorrowWeatherRed}`
                  : `${styles.afterTomorrowWeatherYellow}`
              }`}
            >
              <div className={`${styles.infoSides}`}>&nbsp;</div>
              <div className={`${styles.infoSides}`}>
                <p>DEPOIS DE AMANHÃ</p>
                <p>{ctxAfterTomorrow}ºC</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
