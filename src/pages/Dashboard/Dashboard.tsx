import "./Dashboard.css";
import NavBar from "../../components/Navbar/Navbar";
import ResumoCard from "../../components/Dashboard/Resumo/Resumo";
import ListaTransacoes from "../../components/Dashboard/TransacoesLista/TransacoesLista";
import ResumoSaldo from "../../components/Dashboard/ResumoSaldo/ResumoSaldo";
import AcoesFinanceiras from "../../components/Dashboard/AcoesFinanceiras/AcoesFinanceiras";

export default function Dashboard({
    onAdicionarGanho,
    onAdicionarDespesa,
    onAdicionarInvestimento,
}: {
    onAdicionarGanho: () => void;
    onAdicionarDespesa: () => void;
    onAdicionarInvestimento: () => void;
}) {

  const saldoAtual = 3250.75;

  const transacoes: { id: number; descricao: string; valor: number; tipo: "receita" | "despesa"; data: string }[] = [
    { id: 1, descricao: "Salário", valor: 4500, tipo: "receita", data: "05/01" },
    { id: 2, descricao: "Aluguel", valor: 1200, tipo: "despesa", data: "07/01" },
    { id: 3, descricao: "Mercado", valor: 380, tipo: "despesa", data: "10/01" },
  ];

  return (
    <>
      <NavBar />

      <div className="container-dashboard"> 
        <div className="header-dashboard">
          <div>
            <h1>Bem-vindo de volta, User! </h1>
            <p>Acompanhe seu desempenho financeiro em tempo real</p>
          </div>
        </div>

        <div className="cards-resumo">
          <ResumoCard
            titulo="Recebido no mês"
            valor="R$ 4.500,00"
            tipo="receita"
          />

          <ResumoCard
            titulo="Gasto no mês"
            valor="R$ 1.580,00"
            tipo="despesa"
          />
        
          <ResumoCard
            titulo="Poupança / Investimentos"
            valor="R$ 12.300,00"
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
    </>
  );
}
