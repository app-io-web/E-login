import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_NOCODB_URL + "/api/v2/tables/mk5ja4oi9longc3/records", // Caminho correto da tabela Users
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar o nome do usuário pelo email digitado no login
export const getUserNameByEmail = async (email) => {
  try {
    const response = await api.get(`?where=(EmailUser,eq,${email})`);

    if (response.data.list.length > 0) {
      return response.data.list[0].Nome_Pessoa_Empresa; // Retorna o nome vinculado ao email
    }

    return "Usuário Desconhecido"; // Se não encontrar
  } catch (error) {
    console.error("Erro ao buscar nome do usuário:", error.response ? error.response.data : error);
    return "Erro ao carregar nome";
  }
};
