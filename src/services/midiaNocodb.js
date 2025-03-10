import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`,
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar o total de fotos e GIFs no NocoDB
export const getTotalMidia = async (emailUsuario) => {
  try {
    const query = `?where=(EmailUser,eq,${encodeURIComponent(emailUsuario)})&fields=Photos_Uploads,Gif_Uploads`;
    const response = await api.get(query);

    console.log("📊 Resposta da API para gráfico:", JSON.stringify(response.data, null, 2));

    if (response.data.list && response.data.list.length > 0) {
      let totalPhotos = 0;
      let totalGifs = 0;
      const data = response.data.list[0];

      // 🔹 Contar fotos no campo Photos_Uploads
      if (data.Photos_Uploads) {
        data.Photos_Uploads.forEach((fotoGrupo) => {
          if (fotoGrupo.Fotos && Array.isArray(fotoGrupo.Fotos)) {
            fotoGrupo.Fotos.forEach((foto) => {
              if (foto.Fotos && Array.isArray(foto.Fotos)) {
                totalPhotos += foto.Fotos.length;
              }
            });
          }
        });
      }

      // 🔹 Contar GIFs no campo Gif_Uploads
      if (data.Gif_Uploads) {
        data.Gif_Uploads.forEach((gifGrupo) => {
          if (gifGrupo.GIFs && Array.isArray(gifGrupo.GIFs)) {
            gifGrupo.GIFs.forEach((gif) => {
              if (gif.Fotos && Array.isArray(gif.Fotos)) {
                totalGifs += gif.Fotos.length;
              }
            });
          }
        });
      }

      console.log(`✅ Total de fotos: ${totalPhotos}, Total de GIFs: ${totalGifs}`);
      return { photos: totalPhotos, gifs: totalGifs };
    }

    return { photos: 0, gifs: 0 };
  } catch (error) {
    console.error("🚨 Erro ao buscar mídias para o gráfico:", error.response ? error.response.data : error);
    return { photos: 0, gifs: 0 };
  }
};
