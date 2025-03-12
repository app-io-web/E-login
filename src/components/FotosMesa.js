import React, { useEffect, useState } from "react";
import { getFotosPorMesa } from "../services/getFotosMesa";
import "../styles/FotosMesa.css";

const FotosMesa = ({ setMesaAtual, setFotosMesa }) => {
  const [mesasComFotos, setMesasComFotos] = useState([]);
  const [mesaIndex, setMesaIndex] = useState(0);

  useEffect(() => {
    const fetchFotos = async () => {
      const fotos = await getFotosPorMesa();
      setMesasComFotos(fotos);

      if (fotos.length > 0) {
        atualizarMesa(fotos[0].mesa, fotos[0].fotos);
      }
    };

    fetchFotos();
    const interval = setInterval(fetchFotos, 10000); // Atualiza a cada 10s

    return () => clearInterval(interval);
  }, []);

  // Trocar para a próxima mesa após percorrer todas as fotos da atual
  useEffect(() => {
    if (mesasComFotos.length > 1) {
      const interval = setInterval(() => {
        setMesaIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % mesasComFotos.length;
          atualizarMesa(mesasComFotos[nextIndex].mesa, mesasComFotos[nextIndex].fotos);
          return nextIndex;
        });
      }, 5000 * (mesasComFotos[mesaIndex]?.fotos.length || 1)); // Muda de mesa quando todas as fotos forem exibidas

      return () => clearInterval(interval);
    }
  }, [mesasComFotos, mesaIndex]);

  const atualizarMesa = (mesa, fotos) => {
    setMesaAtual(mesa);
    setFotosMesa(fotos);
  };

  const handleMesaChange = (index) => {
    setMesaIndex(index);
    atualizarMesa(mesasComFotos[index].mesa, mesasComFotos[index].fotos);
  };

  if (mesasComFotos.length === 0) {
    return <p>📷 Nenhuma foto disponível</p>;
  }

  return (
    <div className="carousel-container">
      <h2>📸 Fotos Mesa {mesasComFotos[mesaIndex].mesa}</h2>
      <div className="photo-grid">
        {mesasComFotos[mesaIndex].fotos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Mesa ${mesasComFotos[mesaIndex].mesa}`}
            className="photo-item"
            onClick={() => atualizarMesa(mesasComFotos[mesaIndex].mesa, mesasComFotos[mesaIndex].fotos)}
          />
        ))}
      </div>

      {/* Indicadores de mesas */}
      <div className="mesa-indicators">
        {mesasComFotos.map((_, index) => (
          <span
          key={index}
          className={`indicator ${index === mesaIndex ? "active" : ""}`}
          onClick={() => handleMesaChange(index)}
        />
      ))}
    </div>
  </div>
);
};

export default FotosMesa;
