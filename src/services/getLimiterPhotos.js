import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`, // URL correta
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar o limite de fotos do usuário autenticado
export const getLimiterPhotos = async (emailUsuario) => {
  try {
    const query = `?where=(EmailUser,eq,${encodeURIComponent(emailUsuario)})&fields=Limiter_PhotosUpload`;
    const response = await api.get(query);

    //console.log("📊 Resposta da API para limite de fotos:", JSON.stringify(response.data, null, 2));

    if (response.data.list && response.data.list.length > 0) {
      const limiteFotos = response.data.list[0].Limiter_PhotosUpload || 0;
      //console.log(`✅ Limite de fotos encontrado para ${emailUsuario}:`, limiteFotos);
      return limiteFotos;
    }

    //console.log(`❌ Nenhum limite de fotos encontrado para ${emailUsuario}`);
    return 0;
  } catch (error) {
    //console.error("🚨 Erro ao buscar o limite de fotos:", error.response ? error.response.data : error);
    return 0;
  }
};
