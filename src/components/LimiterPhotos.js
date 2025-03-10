import React, { useEffect, useState } from "react";
import "../styles/LimiterPhotos.css"; // Importamos o CSS
import { getLimiterPhotos } from "../services/getLimiterPhotos";

const LimiterPhotos = ({ emailUsuario }) => {
  const [limiteFotos, setLimiteFotos] = useState(0);

  useEffect(() => {
    // Função para buscar o limite de fotos
    const fetchLimiterPhotos = async () => {
      if (emailUsuario) {
        const limite = await getLimiterPhotos(emailUsuario);
        setLimiteFotos(limite);
      }
    };

    fetchLimiterPhotos(); // Buscar a primeira vez

    // Criamos um intervalo para buscar a cada 3 segundos (3000ms)
    const interval = setInterval(fetchLimiterPhotos, 3000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [emailUsuario]);

  return (
    <div className="limiter-photos">
      <span>Limite de Fotos Total: </span>
      <strong>{limiteFotos} Fotos</strong>
    </div>
  );
};

export default LimiterPhotos;
