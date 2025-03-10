import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_NOCODB_URL, // Apenas a URL base
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Caminho da tabela exata no NocoDB (antes já estava no .env)
const TABLE_PATH = "/api/v2/tables/mk5ja4oi9longc3/records";

// Função para verificar se o e-mail existe na tabela
export const checkEmailExists = async (email) => {
  try {
    const response = await api.get(`${TABLE_PATH}?where=(EmailUser,eq,${email})`);
    return response.data.list.length > 0; // Retorna true se o e-mail existir
  } catch (error) {
    console.error("Erro ao verificar e-mail:", error);
    return false;
  }
};

export default api;
