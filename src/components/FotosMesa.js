import React, { useEffect, useState } from "react";
import { getFotosPorMesa } from "../services/getFotosMesa";
import "../styles/FotosMesa.css";

const FotosMesa = () => {
  const [mesasComFotos, setMesasComFotos] = useState([]);
  const [mesaAtual, setMesaAtual] = useState(0);

  useEffect(() => {
    const fetchFotos = async () => {
      const fotos = await getFotosPorMesa();
      setMesasComFotos(fotos);
    };

    fetchFotos();
    const interval = setInterval(fetchFotos, 5000); // Atualiza a cada 5s

    return () => clearInterval(interval);
  }, []);

  // Alternar automaticamente as mesas a cada 5s
  useEffect(() => {
    if (mesasComFotos.length > 1) {
      const interval = setInterval(() => {
        setMesaAtual((prev) => (prev + 1) % mesasComFotos.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [mesasComFotos]);

  // Trocar manualmente a mesa
  const handleMesaChange = (index) => {
    setMesaAtual(index);
  };

  if (mesasComFotos.length === 0) {
    return <p>📷 Nenhuma foto disponível</p>;
  }

  return (
    <div className="carousel-container">
      <h2>📸 Fotos Mesa {mesasComFotos[mesaAtual].mesa}</h2>
      <div className="photo-grid">
        {mesasComFotos[mesaAtual].fotos.map((foto, index) => (
          <img key={index} src={foto} alt={`Mesa ${mesasComFotos[mesaAtual].mesa}`} className="photo-item" />
        ))}
      </div>

      {/* Indicadores de mesas */}
      <div className="mesa-indicators">
        {mesasComFotos.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === mesaAtual ? "active" : ""}`}
            onClick={() => handleMesaChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FotosMesa;
