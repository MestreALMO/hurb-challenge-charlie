import { useCtxCityState } from "@/context/ctxCityState";
import { useCtxForecast } from "@/context/ctxForecast";
import { useCtxWeather } from "@/context/ctxWeather";
import { useState, useEffect, FC } from "react";
import styles from "./infoCityState.module.css";
import axios from "axios";
import svgCompass from "@/icons/compass.svg";
import Image from "next/image";

export const InfoInput: FC = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { ctxWeather, setCtxWeather } = useCtxWeather();
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    useCtxForecast();

  const getWeather = async () => {
    try {
      const response = await fetch(
        `/api/weather?city=${ctxCity}&state=${ctxState}`
      );
      const data = await response.json();
      setCtxWeather(data);

      const forecastResponse = await fetch(
        `/api/forecast?city=${ctxCity}&state=${ctxState}`
      );
      const forecastData = await forecastResponse.json();
      setCtxTomorrow(forecastData.tomorrow);
      setCtxAfterTomorrow(forecastData.afterTomorrow);
    } catch (error) {
      console.error(
        "Erro ao obter a informação do tempo ou previsão do tempo:",
        error
      );
    }
  };

  const localization = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          try {
            // Chama a nova rota API
            const response = await axios.get(
              `/api/cityState?latitude=${latitude}&longitude=${longitude}`
            );

            setCtxCity(response.data.city);
            setCtxState(response.data.state);
          } catch (error) {
            console.error("Erro ao obter nome da cidade:", error);
          }
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não suportada pelo navegador.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await localization();
      await getWeather();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getWeather();
    };

    fetchData();
  }, [ctxCity, ctxState]);

  return (
    <div className={`${styles.main}`}>
      {coordinates ? (
        <>
          <Image
            src={svgCompass}
            alt="compass icon"
            className={`${styles.icon}`}
          />
          <form onSubmit={getWeather} className={`${styles.inputArea}`}>
            <div className={`${styles.inputContainer}`}>
              <input
                type="text"
                value={ctxCity}
                placeholder="Escreva a cidade"
                onChange={(e) => setCtxCity(e.target.value)}
                className={`${styles.inputCity}`}
              />
              <p>,&nbsp;</p>
              <input
                type="text"
                value={ctxState}
                placeholder="Escreva o estado da cidade"
                onChange={(e) => setCtxState(e.target.value)}
                className={`${styles.inputState}`}
              />
            </div>
          </form>
        </>
      ) : (
        <p>Obtendo localização...</p>
      )}
    </div>
  );
};
