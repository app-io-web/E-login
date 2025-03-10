import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`,
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar o total de mesas sem fotos ou GIFs
export const getTablesWithoutPhotos = async (emailUsuario) => {
  try {
    const query = `?where=(EmailUser,eq,${encodeURIComponent(emailUsuario)})&fields=TableCodes,Photos_Uploads,Gif_Uploads`;
    const response = await api.get(query);

    console.log("📊 Resposta da API para mesas sem fotos:", JSON.stringify(response.data, null, 2));

    if (response.data.list && response.data.list.length > 0) {
      const data = response.data.list[0];

      const totalMesas = data.TableCodes ? data.TableCodes.length : 0; // 🔥 Total de mesas registradas
      const fotosUpload = data.Photos_Uploads || [];
      const gifsUpload = data.Gif_Uploads || [];

      let mesasComFotos = new Set();

      // 🔹 Adiciona mesas que possuem fotos válidas
      fotosUpload.forEach((fotoGrupo) => {
        if (fotoGrupo.mesa && Array.isArray(fotoGrupo.Fotos)) {
          const temFotos = fotoGrupo.Fotos.some((foto) =>
            foto.Fotos && Array.isArray(foto.Fotos) &&
            foto.Fotos.some((f) => f.id && f.url && f.url.trim() !== "")
          );
          if (temFotos) {
            console.log(`📸 Mesa ${fotoGrupo.mesa} TEM fotos`);
            mesasComFotos.add(parseInt(fotoGrupo.mesa));
          }
        }
      });

      // 🔹 Adiciona mesas que possuem GIFs válidos
      gifsUpload.forEach((gifGrupo) => {
        if (gifGrupo.mesa && Array.isArray(gifGrupo.GIFs)) {
          const temGIFs = gifGrupo.GIFs.some((gif) =>
            gif.Fotos && Array.isArray(gif.Fotos) &&
            gif.Fotos.some((g) => g.id && g.url && g.url.trim() !== "")
          );
          if (temGIFs) {
            console.log(`🎞️ Mesa ${gifGrupo.mesa} TEM GIFs`);
            mesasComFotos.add(parseInt(gifGrupo.mesa));
          }
        }
      });

      // 🔹 Calcula total de mesas sem fotos ou GIFs
      const totalMesasSemFotos = totalMesas - mesasComFotos.size; // 🔥 Simples e direto!

      console.log(`✅ Total de mesas sem fotos para ${emailUsuario}:`, totalMesasSemFotos);
      return totalMesasSemFotos;
    }

    console.log(`❌ Nenhuma mesa encontrada para ${emailUsuario}`);
    return 0;
  } catch (error) {
    console.error("🚨 Erro ao buscar mesas sem fotos:", error.response ? error.response.data : error);
    return 0;
  }
};
