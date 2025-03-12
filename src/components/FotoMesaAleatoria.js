import React, { useEffect, useState } from "react";
import { getFotoComUsuario } from "../services/getFotoComUsuario";
import "../styles/FotoMesaAleatoria.css";
import "../styles/MediaScreen1440px.css";

const FotoMesaAleatoria = ({ mesaAtual, fotosMesa }) => {
  const [fotoIndex, setFotoIndex] = useState(0);
  const [usuarioAtual, setUsuarioAtual] = useState("Carregando...");

  useEffect(() => {
    if (fotosMesa.length > 0) {
      atualizarUsuario(mesaAtual, fotosMesa[fotoIndex]);
    }
  }, [mesaAtual, fotosMesa, fotoIndex]);

  const atualizarUsuario = async (mesa, fotoUrl) => {
    const usuario = await getFotoComUsuario(mesa, fotoUrl);
    setUsuarioAtual(usuario || "Usuário Desconhecido");
  };

  // Alternar automaticamente entre as fotos da mesa atual
  useEffect(() => {
    if (fotosMesa.length > 1) {
      const interval = setInterval(() => {
        setFotoIndex((prevIndex) => {
          if (prevIndex + 1 >= fotosMesa.length) {
            return 0; // Volta para a primeira foto quando acabar
          }
          return prevIndex + 1;
        });
      }, 5000); // Muda de foto a cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [fotosMesa]);

  return (
    <div className="foto-mesa-container">
      {fotosMesa.length > 0 ? (
        <>
          <span className="mesa-label">📍 Mesa {mesaAtual}</span>
          <div className="foto-wrapper">
            <img src={fotosMesa[fotoIndex]} alt={`Mesa ${mesaAtual}`} className="foto-mesa" />
            <span className="usuario-label">📸 {usuarioAtual}</span>
          </div>
        </>
      ) : (
        <p>📷 Carregando foto...</p>
      )}
    </div>
  );
};

export default FotoMesaAleatoria;
