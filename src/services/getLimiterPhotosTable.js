import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`, // URL correta
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar o limite de fotos por mesa do usuário autenticado
export const getLimiterPhotosTable = async (emailUsuario) => {
  try {
    const query = `?where=(EmailUser,eq,${encodeURIComponent(emailUsuario)})&fields=Limiter_Photos_Table`;
    const response = await api.get(query);

    //console.log("📊 Resposta da API para limite de fotos por mesa:", JSON.stringify(response.data, null, 2));

    if (response.data.list && response.data.list.length > 0) {
      const limiteFotosMesa = response.data.list[0].Limiter_Photos_Table || 0;
      //console.log(`✅ Limite de fotos por mesa encontrado para ${emailUsuario}:`, limiteFotosMesa);
      return limiteFotosMesa;
    }

    //console.log(`❌ Nenhum limite de fotos por mesa encontrado para ${emailUsuario}`);
    return 0;
  } catch (error) {
    //console.error("🚨 Erro ao buscar o limite de fotos por mesa:", error.response ? error.response.data : error);
    return 0;
  }
};
