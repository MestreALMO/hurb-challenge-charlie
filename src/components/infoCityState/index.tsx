import { useCtxCityState } from "@/context/ctxCityState";
import axios from "axios";
import { useState, useEffect, FC } from "react";
import styles from "./infoCityState.module.css";

export const InfoCityState: FC = () => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  // getting latitude, longitude, city and state
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
            );

            setCtxCity(response.data.results[0].components.city);
            setCtxState(response.data.results[0].components.state);
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
  }, []);

  return (
    <div className={`${styles.main}`}>
      {coordinates ? (
        <form onSubmit={() => {}} className={`${styles.inputArea}`}>
          <input
            type="text"
            value={ctxCity}
            placeholder="Escreva a cidade"
            onChange={(e) => setCtxCity(e.target.value)}
          />
          <p>,&nbsp;</p>
          <input
            type="text"
            value={ctxState}
            placeholder="Escreva o estado da cidade"
            onChange={(e) => setCtxState(e.target.value)}
          />
        </form>
      ) : (
        <p>Obtendo localização...</p>
      )}
    </div>
  );
};
