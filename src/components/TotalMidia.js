import React, { useEffect, useState } from "react";
import "../styles/TotalMidia.css";
import { getTotalMidia } from "../services/photosNocodb";

const TotalMidia = ({ emailUsuario }) => {
  const [totalMidia, setTotalMidia] = useState(0);

  useEffect(() => {
    // 📌 Busca o total de mídias baseado na tabela do usuário autenticado
    const fetchTotalMidia = async () => {
      if (emailUsuario) {
        const total = await getTotalMidia(emailUsuario);
        setTotalMidia(total);
      }
    };

    fetchTotalMidia();

    // Atualiza os dados a cada 10 segundos
    const interval = setInterval(fetchTotalMidia, 400);

    return () => clearInterval(interval);
  }, [emailUsuario]);

  return (
    <div className="total-midia">
      <h3>Total de Fotos e GIFs</h3>
      <p>{totalMidia} Mídias</p>
    </div>
  );
};

export default TotalMidia;
