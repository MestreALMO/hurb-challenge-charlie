import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface CityStateResponse {
  city?: string;
  state?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CityStateResponse>
) {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );

    const city = response.data.results[0].components.city;
    const state = response.data.results[0].components.state;

    res.status(200).json({ city, state });
  } catch (error) {
    console.error("Erro ao obter nome da cidade:", error);
    res.status(500).json({ error: "Erro ao obter nome da cidade" });
  }
}
