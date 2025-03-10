import React, { useEffect, useState } from "react";
import "../styles/TablesWithoutPhotos.css"; // Criamos o CSS
import { getTablesWithoutPhotos } from "../services/getTablesWithoutPhotos";

const TablesWithoutPhotos = ({ emailUsuario }) => {
  const [totalMesasSemFotos, setTotalMesasSemFotos] = useState(0);

  useEffect(() => {
    // Buscar o total de mesas sem fotos
    const fetchTablesWithoutPhotos = async () => {
      if (emailUsuario) {
        const total = await getTablesWithoutPhotos(emailUsuario);
        setTotalMesasSemFotos(total);
      }
    };

    fetchTablesWithoutPhotos(); // Buscar a primeira vez

    // Criamos um intervalo para buscar a cada 3 segundos (3000ms)
    const interval = setInterval(fetchTablesWithoutPhotos, 3000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [emailUsuario]);

  return (
    <div className="tables-without-photos">
      <span>Total de Mesas Sem Fotos: </span>
      <strong>{totalMesasSemFotos} Mesas</strong>
    </div>
  );
};

export default TablesWithoutPhotos;
