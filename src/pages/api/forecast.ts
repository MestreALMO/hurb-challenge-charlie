import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface WeatherForecast {
  tomorrow: number;
  afterTomorrow: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, state } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state}&appid=${apiKey}&lang=pt_br&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const forecasts = response.data.list;

    const tomorrow = forecasts[0].main.temp;
    const afterTomorrow = forecasts[1].main.temp;

    const forecast: WeatherForecast = {
      tomorrow,
      afterTomorrow,
    };

    res.status(200).json(forecast);
  } catch (error) {
    console.error("Erro ao obter a previsão do tempo:", error);
    res.status(500).json({ error: "Erro ao obter a previsão do tempo" });
  }
}
