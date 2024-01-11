import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { city, state } = req.query;

    if (!city || !state) {
      return res
        .status(400)
        .json({ error: "Por favor, forneça cidade e estado." });
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`;

    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter a previsão do tempo." });
  }
}
