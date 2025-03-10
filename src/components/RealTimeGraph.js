import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";
import { format } from "date-fns"; // 📌 Importa o formatador de data
import { getTotalMidia } from "../services/midiaNocodb";
import "../styles/RealTimeGraph.css";

// 📌 Registra os componentes necessários
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const RealTimeGraph = ({ emailUsuario }) => {
  const [midiaHistory, setMidiaHistory] = useState([]);

  useEffect(() => {
    const fetchMidiaData = async () => {
      if (emailUsuario) {
        const totalMidia = await getTotalMidia(emailUsuario);
        const timestamp = new Date(); // 📌 Data e hora atuais
        setMidiaHistory((prevData) => [
          ...prevData.slice(-20), // 📌 Mantém só os últimos 20 registros
          { time: timestamp, photos: totalMidia.photos, gifs: totalMidia.gifs },
        ]);
      }
    };

    fetchMidiaData();
    const interval = setInterval(fetchMidiaData, 1000); // Atualiza a cada 3s

    return () => clearInterval(interval);
  }, [emailUsuario]);

  const data = {
    labels: midiaHistory.map((d) => format(new Date(d.time), "HH:mm:ss")), // 📌 Formata apenas como Hora:Minuto:Segundo
    datasets: [
      {
        label: "Fotos",
        data: midiaHistory.map((d) => d.photos),
        borderColor: "#8C52FF",
        backgroundColor: "#8C52FF33",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "GIFs",
        data: midiaHistory.map((d) => d.gifs),
        borderColor: "#FF52A2",
        backgroundColor: "#FF52A233",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="realtime-graph">
      <h3>📊 Gráfico em Tempo Real</h3>
      <Line data={data} />
    </div>
  );
};

export default RealTimeGraph;
