import { useCtxCityState } from "@/context/ctxCityState";
import { useState, useEffect, FC } from "react";
import styles from "./infoCityState.module.css";
import axios from "axios";

export const InfoCityState: FC = () => {
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
  }, []);

  return (
    <div className={`${styles.main}`}>
      {coordinates ? (
        <form onSubmit={() => {}} className={`${styles.inputArea}`}>
          lat:{coordinates.latitude}
          long:{coordinates.longitude}
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
