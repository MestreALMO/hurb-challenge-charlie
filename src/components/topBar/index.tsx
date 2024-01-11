import axios from "axios";
import { useState, useEffect, FC } from "react";

interface apiDataProps {
  city: string;
  state: string;
}

export const TopBar: FC = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [apiData, setApiData] = useState<apiDataProps>();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=33d460fcc7c64f019d8baf98ed69b1f6`
            );

            setApiData(response.data.results[0].components);
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
    <div>
      {coordinates ? (
        <>
          <p>
            Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
          </p>
          <p>Cidade: {apiData?.city}</p>
          <p>Estado: {apiData?.state}</p>
        </>
      ) : (
        <p>Obtendo localização...</p>
      )}
    </div>
  );
};
