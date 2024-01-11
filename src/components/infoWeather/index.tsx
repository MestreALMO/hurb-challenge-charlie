import { useCtxCityState } from "@/context/ctxCityState";
import { useCtxWeather } from "@/context/ctxWeather";
import { useState } from "react";

export const InfoWeather: React.FC = () => {
  const { ctxWeather, setCtxWeather } = useCtxWeather();
  const { ctxCity, setCtxCity, ctxState, setCtxState } = useCtxCityState();

  const getWeather = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/weather?city=${ctxCity}&state=${ctxState}`
      );
      const data = await response.json();
      setCtxWeather(data);
    } catch (error) {
      console.error("Erro ao obter a previsão do tempo:", error);
    }
  };

  console.log(ctxWeather);

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
            Previsão do Tempo para {ctxCity}, {ctxState}
          </h2>
          <p>HOJE</p>
          <p></p>
          <p>AMANHÃ</p>
          <p>DEPOIS DE AMANHÃ</p>
          {/* Exiba as informações da previsão do tempo aqui */}
          <pre>{JSON.stringify(ctxWeather, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
