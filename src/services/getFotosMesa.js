import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`,
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// Função para buscar fotos e GIFs por mesa
export const getFotosPorMesa = async () => {
  try {
    const query = `?fields=Photos_Uploads,Gif_Uploads`;
    const response = await api.get(query);

    if (response.data.list && response.data.list.length > 0) {
      const registros = response.data.list[0];

      let fotosPorMesa = [];

      // 🔹 Fotos do campo Photos_Uploads
      if (registros.Photos_Uploads) {
        registros.Photos_Uploads.forEach((fotoGrupo) => {
          if (fotoGrupo.mesa && Array.isArray(fotoGrupo.Fotos)) {
            const fotosValidas = fotoGrupo.Fotos.flatMap((foto) =>
              foto.Fotos ? foto.Fotos.map((f) => f.url).filter((url) => url && url.trim() !== "") : []
            );

            if (fotosValidas.length > 0) {
              fotosPorMesa.push({ mesa: fotoGrupo.mesa, fotos: fotosValidas });
            }
          }
        });
      }

      // 🔹 GIFs do campo Gif_Uploads
      if (registros.Gif_Uploads) {
        registros.Gif_Uploads.forEach((gifGrupo) => {
          if (gifGrupo.mesa && Array.isArray(gifGrupo.GIFs)) {
            const gifsValidos = gifGrupo.GIFs.flatMap((gif) =>
              gif.Fotos ? gif.Fotos.map((g) => g.url).filter((url) => url && url.trim() !== "") : []
            );

            if (gifsValidos.length > 0) {
              const mesaExistente = fotosPorMesa.find((m) => m.mesa === gifGrupo.mesa);
              if (mesaExistente) {
                mesaExistente.fotos.push(...gifsValidos);
              } else {
                fotosPorMesa.push({ mesa: gifGrupo.mesa, fotos: gifsValidos });
              }
            }
          }
        });
      }

      return fotosPorMesa;
    }

    return [];
  } catch (error) {
    console.error("🚨 Erro ao buscar fotos por mesa:", error);
    return [];
  }
};
