import React, { useEffect, useState } from "react";
import "../styles/TotalMesas.css";
import { getTotalMesas } from "../services/tableEventNocodb";

const TotalMesas = ({ emailUsuario }) => {
  const [totalMesas, setTotalMesas] = useState(0);

  useEffect(() => {
    // Busca o total de mesas apenas para o usuário logado
    const fetchTotalMesas = async () => {
      if (emailUsuario) {
        const total = await getTotalMesas(emailUsuario);
        setTotalMesas(total);
      }
    };

    fetchTotalMesas();

    // Atualiza os dados a cada 10 segundos
    const interval = setInterval(fetchTotalMesas, 400);

    return () => clearInterval(interval);
  }, [emailUsuario]);

  return (
    <div className="total-mesas">
      <h3>Total de Mesas</h3>
      <p>{totalMesas} Mesas</p>
    </div>
  );
};

export default TotalMesas;
