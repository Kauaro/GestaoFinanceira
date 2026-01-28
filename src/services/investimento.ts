import { api } from "./api";

export async function listarInvestimentos() {
  const response = await api.get("/financas/Investimento/visualizar/ultimos?quantidade=5");
  return response.data;
}


export async function criarInvestimento(dados: {
  descricao: string;
  categoria: string;
  valorAplicado: number;
  dataAplicacao: string;
}) {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/financas/Investimentos/criar",
    dados,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}



interface ResgatarInvestimentoPayload {
  valor: number;
  categoria: "Investimento" | "Poupança";
  dataResgate: string;
}

export async function resgatarInvestimento(payload: ResgatarInvestimentoPayload) {
  const response = await api.post("/financas/Investimentos/resgatar", payload);
  return response.data;
}







export async function obterInvestimentos() {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/financas/Investimentos/obter",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}






export async function totalMesAtual() {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/financas/Investimento/visualizar/total-mes-atual",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}


