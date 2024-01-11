import { useCtxCityState } from "@/context/ctxCityState";
import { useState } from "react";

const WeatherPage: React.FC = () => {
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/weather?city=${ctxCity}&state=${ctxState}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Erro ao obter a previsão do tempo:", error);
    }
  };

  return (
    <div>
      <h1>Consulta de Previsão do Tempo</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Digite a cidade"
          value={ctxCity}
          onChange={(e) => setCtxCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite o estado"
          value={ctxState}
          onChange={(e) => setCtxState(e.target.value)}
        />
        <button type="submit">Consultar</button>
      </form>

      {weatherData && (
        <div>
          <h2>
            Previsão do Tempo para {ctxCity}, {ctxState}
          </h2>
          {/* Exiba as informações da previsão do tempo aqui */}
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
