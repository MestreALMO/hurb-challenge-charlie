import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./bingBackground.module.css";

export const BingBackground = () => {
  const [bingData, setBingData] = useState<{
    imageUrl: string;
    imageTitle: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faz a solicitação para a API que criamos
        const response = await fetch("/api/imgBingBackground");
        const data = await response.json();

        // Atualiza o estado com os dados da API
        setBingData(data);
      } catch (error) {
        console.error("Erro ao buscar dados da API do Bing:", error);
      }
    };

    // Chama a função de busca de dados quando o componente é montado
    fetchData();
  }, []); // O array vazio assegura que o efeito só seja executado uma vez, equivalente a componentDidMount

  return (
    <>
      {/* background img */}
      {bingData ? (
        <>
          <div className={`${styles.backgroundImage}`}>
            <Image
              src={bingData.imageUrl}
              alt={bingData.imageTitle}
              layout="fill"
              objectFit="cover"
            />
            <p>{bingData.imageTitle}</p>
          </div>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};
