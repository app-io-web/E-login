import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailExists } from "../services/loginNocodb";
import "../styles/Login.css";

// Lista de backgrounds aleatórios
const backgrounds = [
  require("../assets/background/bg1.jpg"),
  require("../assets/background/bg2.jpg"),
  require("../assets/background/bg3.jpg"),
  require("../assets/background/bg4.jpg"),
];

// Logo e tela indisponível
const logo = require("../assets/Logo/cloudparty-Logo.png");
const telaIndisponivel = require("../assets/Others Assets/Tela Indisponivel.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Seleciona um background aleatório ao carregar a página
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackgroundImage(randomBg);

    // Função para verificar se a tela é de um celular
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Chama a função ao montar o componente
    checkMobile();

    // Adiciona um event listener para detectar mudanças no tamanho da tela
    window.addEventListener("resize", checkMobile);

    // Limpa o event listener ao desmontar o componente
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = async () => {
    if (!email) {
      setMensagem("Por favor, insira um e-mail!");
      return;
    }

    const existe = await checkEmailExists(email);

    if (existe) {
      setMensagem("Login bem-sucedido!");
      setTimeout(() => navigate("/dashboard", { state: { email } }), 1000); // Passa o email para o Dashboard
    } else {
      setMensagem("E-mail não encontrado!");
    }
  };

  // Se for um celular, exibe a imagem de "Tela Indisponível"
  if (isMobile) {
    return (
      <div className="mobile-block">
        <img className="mobile-image" src={telaIndisponivel} alt="Tela Indisponível" />
      </div>
    );
  }

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Cabeçalho */}
      <header className="login-header">
        <h1>Cloud Party</h1>
      </header>

      {/* Área principal do login */}
      <div className="login-box">
        <img className="login-logo" src={logo} alt="Logo Cloud Party" />
        <input
          type="email"
          placeholder="Seu Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Entrar</button>
        {mensagem && <p className="login-message">{mensagem}</p>}
        <p className="register-text">
          Não Tem Cadastro? <span className="register-link">Clique aqui</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
