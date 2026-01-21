import { api } from "./api";

export async function listarGastos() {
  const response = await api.get("/financas/Gasto/visualizar/ultimos?quantidade=5");
  return response.data;
}

type CriarGastoDTO = {
  descricao: string;
  valor: number;
  categoria: string;
  pagamento: string;
  dataGasto: string;
};

export async function criarGasto(dados: CriarGastoDTO) {
  const token = localStorage.getItem("token");

  const response = await api.post("/financas/Gasto/criar", dados, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function totalMesAtual() {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/financas/Gasto/visualizar/total-mes-atual",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; 
}
