import React, { useEffect, useState } from "react";
import "../styles/LimiterPhotosTable.css"; // Criamos o CSS
import { getLimiterPhotosTable } from "../services/getLimiterPhotosTable";

const LimiterPhotosTable = ({ emailUsuario }) => {
  const [limiteFotosMesa, setLimiteFotosMesa] = useState(0);

  useEffect(() => {
    // Buscar o limite de fotos por mesa do usuário autenticado
    const fetchLimiterPhotosTable = async () => {
      if (emailUsuario) {
        const limite = await getLimiterPhotosTable(emailUsuario);
        setLimiteFotosMesa(limite);
      }
    };

    fetchLimiterPhotosTable(); // Buscar a primeira vez

    // Criamos um intervalo para buscar a cada 3 segundos (3000ms)
    const interval = setInterval(fetchLimiterPhotosTable, 3000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [emailUsuario]);

  return (
    <div className="limiter-photos-table">
      <span>Limite de Fotos por Mesa: </span>
      <strong>{limiteFotosMesa} Fotos</strong>
    </div>
  );
};

export default LimiterPhotosTable;
