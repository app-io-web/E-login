import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TotalMesas from "../components/TotalMesas";
import TotalMidia from "../components/TotalMidia";
import LimiterPhotos from "../components/LimiterPhotos"; 
import LimiterPhotosTable from "../components/LimiterPhotosTable"; 
import TablesWithoutPhotos from "../components/TablesWithoutPhotos"; // Importamos o novo componente
import FotosMesa from "../components/FotosMesa"; // 📌 Importando o novo componente
import { useLocation } from "react-router-dom";
import RealTimeGraph from "../components/RealTimeGraph";
import "../styles/Dashboard.css";

// Imagem de tela indisponível para mobile
const telaIndisponivel = require("../assets/Others Assets/Tela Indisponivel.png");

const Dashboard = () => {
  const location = useLocation();
  const emailUsuario = location.state?.email || "";
  const [isMobile, setIsMobile] = useState(false);

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
      <Sidebar emailUsuario={emailUsuario} />
      <div className="dashboard-content">
        {/* Linha 1 - Estatísticas principais */}
        <TotalMesas emailUsuario={emailUsuario} />
        <TotalMidia emailUsuario={emailUsuario} />
        <div className="limiter-container">
          <LimiterPhotos emailUsuario={emailUsuario} />
          <LimiterPhotosTable emailUsuario={emailUsuario} />
          <TablesWithoutPhotos emailUsuario={emailUsuario} />
          <FotosMesa />
        </div>

        {/* Linha 2 - Gráfico (Ocupando toda a largura) */}
        <div className="graph-container">
          <RealTimeGraph emailUsuario={emailUsuario} />
        </div>

      </div>


    </div>
  );
};

export default Dashboard;
