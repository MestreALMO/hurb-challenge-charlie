import { useCtxCityState } from "@/context/ctxCityState";
import { useCtxForecast } from "@/context/ctxForecast";
import { useCtxWeather } from "@/context/ctxWeather";

export const InfoWeather: React.FC = () => {
  const { ctxWeather, setCtxWeather } = useCtxWeather();
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();
  const { ctxTomorrow, setCtxTomorrow, ctxAfterTomorrow, setCtxAfterTomorrow } =
    useCtxForecast();

  const getWeather = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/weather?city=${ctxCity}&state=${ctxState}`
      );
      const data = await response.json();
      setCtxWeather(data);
    } catch (error) {
      console.error("Erro ao obter a informação do tempo:", error);
    }
    try {
      const response = await fetch(
        `/api/forecast?city=${ctxCity}&state=${ctxState}`
      );
      const data = await response.json();
      setCtxTomorrow(data.tomorrow);
      setCtxAfterTomorrow(data.afterTomorrow);
    } catch (error) {
      console.error("Erro ao obter a previsão do tempo:", error);
    }
  };

  setCtxTomorrow(43);

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

      {ctxWeather && (
        <div>
          <h2>
            Previsão do Tempo para {ctxCity}, {ctxState}.
          </h2>
          <p>HOJE</p>
          <p>{ctxWeather.main.temp}ºC</p>
          <p>{ctxWeather.weather[0].description}</p>
          <p>Vento: {ctxWeather.wind.speed}km/h</p>
          <p>Humidade: {ctxWeather.main.humidity}%</p>
          <p>AMANHÃ</p>
          <p>{ctxTomorrow}ºC</p>
          <p>DEPOIS DE AMANHÃ</p>
          <p>{ctxAfterTomorrow}ºC</p>
        </div>
      )}
    </div>
  );
};
