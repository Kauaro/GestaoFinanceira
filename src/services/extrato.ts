import { api } from "./api";


export interface TransacaoDTO {
  id: string;
  tipo: 'Ganho' | 'Gasto' | 'Investimento';
  descricao: string;
  valor: number;
  data: string;
  categoria?: string;
}


export const listarExtratoTotal = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Usuário não autenticado');

  const response = await api.get(`/usuario/extrato-total`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data; // deve ser lista de ExtratoFinanceiroDTO
};



export const listarExtratoMensal = async (ano: number | string, mes: number | string): Promise<TransacaoDTO[]> => {
  const response = await api.get<TransacaoDTO[]>('/usuario/extrato-mensal', {
    params: { ano, mes } 
  });
  return response.data; 
};