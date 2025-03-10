import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { FaUser, FaCalendarCheck } from "react-icons/fa";
import { getUserNameByEmail } from "../services/dadospeopleNocodb";

const Sidebar = ({ emailUsuario }) => {
  const [userName, setUserName] = useState("Carregando...");

  useEffect(() => {
    if (emailUsuario) {
      // Função para buscar e atualizar o nome em tempo real
      const fetchUserName = async () => {
        const nome = await getUserNameByEmail(emailUsuario);
        setUserName(nome);
      };

      fetchUserName(); // Chama imediatamente ao carregar

      // Define um intervalo para verificar mudanças a cada 5 segundos
      const interval = setInterval(fetchUserName, 3000);

      // Cleanup: remove o intervalo ao desmontar o componente
      return () => clearInterval(interval);
    }
  }, [emailUsuario]); // Sempre que o email mudar, reinicia o efeito

  return (
    <div className="sidebar">
      {/* Nome do Usuário */}
      <div className="user-section">
        <FaUser className="user-icon" />
        <span>{userName}</span>
      </div>

      {/* Menu */}
      <nav className="menu">
        <h3>🎉 Controle da Festa</h3>
        <ul>
          <li>
            <FaCalendarCheck className="menu-icon" /> Dashboard Principal
          </li>
          <li>└── Mesas disponíveis</li>
          <li>└── Fotos disponíveis</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
