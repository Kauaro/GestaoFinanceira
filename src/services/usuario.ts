import { api } from "./api";




export async function obterUsuarioLogado() {
  const response = await api.get("/usuario/me");
  return response.data;
}
