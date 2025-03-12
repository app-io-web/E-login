import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_NOCODB_URL}/api/v2/tables/mk5ja4oi9longc3/records`,
  headers: {
    "xc-token": process.env.REACT_APP_NOCODB_TOKEN,
  },
});

// 🔥 Função para buscar o usuário que enviou uma foto específica
export const getFotoComUsuario = async (mesa, fotoUrl) => {
  try {
    const query = `?fields=Photos_Uploads`;
    const response = await api.get(query);

    if (response.data.list && response.data.list.length > 0) {
      const registros = response.data.list[0];

      if (registros.Photos_Uploads) {
        for (const fotoGrupo of registros.Photos_Uploads) {
          if (fotoGrupo.mesa === mesa && fotoGrupo.Fotos) {
            for (const usuarioData of fotoGrupo.Fotos) {
              if (usuarioData.Fotos) {
                for (const foto of usuarioData.Fotos) {
                  if (foto.url === fotoUrl) {
                    return usuarioData.Usuario; // Retorna o usuário correto
                  }
                }
              }
            }
          }
        }
      }
    }

    return "Usuário Desconhecido";
  } catch (error) {
    console.error("🚨 Erro ao buscar usuário da foto:", error);
    return "Erro ao buscar";
  }
};
