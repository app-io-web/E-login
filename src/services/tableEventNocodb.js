import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_NOCODB_URL, // Apenas a URL base
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Caminho correto da tabela TableEvent no NocoDB
const TABLE_PATH = "/api/v2/tables/mk5ja4oi9longc3/records";

// Função para buscar o total de mesas APENAS do usuário logado
export const getTotalMesas = async (emailUsuario) => {
  try {
    // Filtra os registros apenas para o usuário logado
    const query = `?where=(EmailUser,eq,${emailUsuario})`;
    const response = await api.get(`${TABLE_PATH}${query}`);

    if (response.data.list && response.data.list.length > 0) {
      // Soma apenas os valores filtrados pelo usuário correto
      const totalMesas = response.data.list.reduce(
        (acc, item) => acc + (item.TableEvent || 0), 
        0
      );
      return totalMesas;
    }

    return 0; // Retorna 0 se não houver registros para o usuário
  } catch (error) {
    console.error("Erro ao buscar o total de mesas:", error.response ? error.response.data : error);
    return 0; // Retorna 0 em caso de erro
  }
};
