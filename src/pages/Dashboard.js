import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TotalMesas from "../components/TotalMesas";
import TotalMidia from "../components/TotalMidia";
import LimiterPhotos from "../components/LimiterPhotos";
import LimiterPhotosTable from "../components/LimiterPhotosTable";
import TablesWithoutPhotos from "../components/TablesWithoutPhotos";
import FotosMesa from "../components/FotosMesa";
import { useLocation } from "react-router-dom";
import RealTimeGraph from "../components/RealTimeGraph";
import FotoMesaAleatoria from "../components/FotoMesaAleatoria";
import "../styles/Dashboard.css";
import "../styles/MediaScreen1440px.css";

// Imagem de tela indisponível para mobile
const telaIndisponivel = require("../assets/Others Assets/Tela Indisponivel.png");

const Dashboard = () => {
  const location = useLocation();
  const emailUsuario = location.state?.email || "";
  const [isMobile, setIsMobile] = useState(false);

  const [mesaAtual, setMesaAtual] = useState("");
  const [fotosMesa, setFotosMesa] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-block">
        <img className="mobile-image" src={telaIndisponivel} alt="Tela Indisponível" />
      </div>
    );
  }

  return (
    <div className="dashboard">
    <div className="sidebar">
      <Sidebar emailUsuario={emailUsuario} />
    </div>
      <div className="dashboard-content">
        {/* Linha 1 - Estatísticas principais e gráfico */}
        <div className="top-container">
          <TotalMesas emailUsuario={emailUsuario} />
          <TotalMidia emailUsuario={emailUsuario} />
          <div className="limiter-container">
            <LimiterPhotos emailUsuario={emailUsuario} />
            <LimiterPhotosTable emailUsuario={emailUsuario} />
            <TablesWithoutPhotos emailUsuario={emailUsuario} />
          </div>
          <div className="graph-container">
            <RealTimeGraph emailUsuario={emailUsuario} />
          </div>
        </div>

        {/* Linha 2 - Fotos dentro de um container */}
       {/* Seção das fotos */}
       <div className="photos-container">
          <FotoMesaAleatoria mesaAtual={mesaAtual} fotosMesa={fotosMesa} />
          <FotosMesa setMesaAtual={setMesaAtual} setFotosMesa={setFotosMesa} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
