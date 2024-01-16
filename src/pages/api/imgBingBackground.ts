import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Faz uma solicitação para a API do Bing
    const response = await axios.get(
      "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=pt-br"
    );

    // Verifica se a resposta possui dados e a primeira imagem
    if (
      response.data &&
      response.data.images &&
      response.data.images.length > 0
    ) {
      const imageData = response.data.images[0];

      // Extrai as informações desejadas
      const imageUrl = `https://www.bing.com${imageData.url}`;
      const imageTitle = imageData.title;

      // Retorna as informações como JSON
      res.status(200).json({ imageUrl, imageTitle });
    } else {
      // Se não houver dados válidos na resposta, retorna um erro
      res.status(404).json({
        error: "Nenhuma imagem encontrada na resposta da API do Bing.",
      });
    }
  } catch (error) {
    // Se ocorrer um erro durante a solicitação, retorna um erro
    res
      .status(500)
      .json({ error: "Erro ao obter informações da API do Bing." });
  }
};
