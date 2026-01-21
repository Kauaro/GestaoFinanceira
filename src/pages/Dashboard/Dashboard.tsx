import { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import ResumoCard from "../../components/Dashboard/Resumo/Resumo";
import ListaTransacoes from "../../components/Dashboard/TransacoesLista/TransacoesLista";
import ResumoSaldo from "../../components/Dashboard/ResumoSaldo/ResumoSaldo";
import AcoesFinanceiras from "../../components/Dashboard/AcoesFinanceiras/AcoesFinanceiras";
import { obterUsuarioLogado } from "../../services/usuario";


import Footer from "../../components/Footer/Footer";

import { totalMesAtual as totalGanhosMes, listarGanhos } from "../../services/ganhos";
import { totalMesAtual as totalGastosMes, listarGastos } from "../../services/gastos";

type Transacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa";
  data: string;
};

export default function Dashboard({
  onAdicionarGanho,
  onAdicionarDespesa,
  onAdicionarInvestimento,
}: {
  onAdicionarGanho: () => void;
  onAdicionarDespesa: () => void;
  onAdicionarInvestimento: () => void;
}) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [ganhosMes, setGanhosMes] = useState(0);
  const [gastosMes, setGastosMes] = useState(0);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function carregarDashboard() {
    try {
      // 🔥 Usuário logado
      const usuario = await obterUsuarioLogado();
      setNomeUsuario(usuario.nome);

      // 🔥 Totais do mês
      const totalGanhos = await totalGanhosMes();
      const totalGastos = await totalGastosMes();

      setGanhosMes(totalGanhos);
      setGastosMes(totalGastos);
      setSaldoAtual(totalGanhos - totalGastos);

      // 🔥 Últimas transações
      const ganhos = await listarGanhos();
      const gastos = await listarGastos();

      const listaGanhos: Transacao[] = ganhos.map((g: any) => ({
        id: g.id,
        descricao: g.descricao,
        valor: g.valor,
        tipo: "receita",
        data: g.dataGanho,
      }));

      const listaGastos: Transacao[] = gastos.map((g: any) => ({
        id: g.id,
        descricao: g.descricao,
        valor: g.valor,
        tipo: "despesa",
        data: g.dataGasto,
      }));

      const todas = [...listaGanhos, ...listaGastos].sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );

      setTransacoes(todas.slice(0, 5));
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  carregarDashboard();
}, []);


  if (loading) {
    return <p style={{ padding: 40 }}>Carregando dashboard...</p>;
  }

  return (
    <>
    <Sidebar />
      <div className="dashboard-wrapper">
        

        <div className="container-dashboard">
          <div className="header-dashboard">
            <div>
              <h1>Bem-vindo de volta, {nomeUsuario} 👋</h1>
              <p>Acompanhe seu desempenho financeiro em tempo real</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="cards-resumo">
            <ResumoCard
              titulo="Recebido no mês"
              valor={`R$ ${ganhosMes.toFixed(2)}`}
              tipo="receita"
            />

            <ResumoCard
              titulo="Gasto no mês"
              valor={`R$ ${gastosMes.toFixed(2)}`}
              tipo="despesa"
            />

            <ResumoCard
              titulo="Investimentos"
              valor={`R$ 0.00`}
              tipo="investimento"
            />
          </div>

          <ResumoSaldo saldo={saldoAtual} />

          <AcoesFinanceiras
            onAdicionarGanho={onAdicionarGanho}
            onAdicionarDespesa={onAdicionarDespesa}
            onAdicionarInvestimento={onAdicionarInvestimento}
          />

          <ListaTransacoes transacoes={transacoes} />
        </div>
      </div>

      <Footer />
    </>
  );
}
