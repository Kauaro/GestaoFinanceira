import { api } from "./api";

export async function listarGanhos() {
  const response = await api.get("/financas/Ganho/visualizar/ultimos?quantidade=5");
  return response.data;
}

type CriarGanhoDTO = {
  descricao: string;
  valor: number;
  categoria: string;
  pagamento: string;
  dataGanho: string;
};

export async function criarGanho(dados: CriarGanhoDTO) {
  const token = localStorage.getItem("token");

  const response = await api.post("/financas/Ganho/criar", dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function totalMesAtual() {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/financas/Ganho/visualizar/total-mes-atual",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // número
}
