import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`, // URL correta
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});


export const getTotalMidia = async (emailUsuario) => {
  try {
    const query = `?where=(EmailUser,eq,${encodeURIComponent(emailUsuario)})&fields=Photos_Uploads,Gif_Uploads`;
    const response = await api.get(query);

    //console.log("🔍 Resposta da API:", JSON.stringify(response.data, null, 2));

    if (response.data.list && response.data.list.length > 0) {
      let totalMidia = 0;

      response.data.list.forEach((registro) => {
        // 📌 Contar fotos dentro de "Photos_Uploads"
        if (registro.Photos_Uploads && Array.isArray(registro.Photos_Uploads)) {
          registro.Photos_Uploads.forEach((fotoGrupo) => {
            if (fotoGrupo.Fotos && Array.isArray(fotoGrupo.Fotos)) {
              fotoGrupo.Fotos.forEach((foto) => {
                if (foto.Fotos && Array.isArray(foto.Fotos)) {
                  foto.Fotos.forEach((f) => {
                    if (f.url && f.url.trim() !== "") {
                      //console.log("📸 Foto válida encontrada:", f.url);
                      totalMidia++;
                    }
                  });
                }
              });
            }
          });
        }

        // 📌 Contar GIFs dentro de "Gif_Uploads"
        if (registro.Gif_Uploads && Array.isArray(registro.Gif_Uploads)) {
          registro.Gif_Uploads.forEach((gifGrupo) => {
            // 🔹 Verificar "Fotos" dentro de Gif_Uploads
            if (gifGrupo.Fotos && Array.isArray(gifGrupo.Fotos)) {
              gifGrupo.Fotos.forEach((gif) => {
                if (gif.url && gif.url.trim() !== "") {
                  //console.log("🎬 GIF válido encontrado (Fotos):", gif.url);
                  totalMidia++;
                }
              });
            }

            // 🔹 Verificar "GIFs" dentro de Gif_Uploads (⚠️ Corrigido!)
            if (gifGrupo.GIFs && Array.isArray(gifGrupo.GIFs)) {
              gifGrupo.GIFs.forEach((gif) => {
                if (gif.Fotos && Array.isArray(gif.Fotos)) {
                  gif.Fotos.forEach((f) => {
                    if (f.url && f.url.trim() !== "") {
                      //console.log("🎞 GIF válido encontrado (GIFs):", f.url);
                      totalMidia++;
                    }
                  });
                }
              });
            }
          });
        }
      });

      //console.log(`✅ Total de mídias para ${emailUsuario}:`, totalMidia);
      return totalMidia;
    }

    console.log(`❌ Nenhuma mídia encontrada para ${emailUsuario}`);
    return 0;
  } catch (error) {
    console.error("🚨 Erro ao buscar o total de mídias:", error.response ? error.response.data : error);
    return 0;
  }
};


