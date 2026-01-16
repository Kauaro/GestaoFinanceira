import { PlusCircle, TrendingDown, PiggyBank } from "lucide-react";
import "./AcoesFinanceiras.css";

interface AcoesFinanceirasProps {
  onAdicionarGanho: () => void;
  onAdicionarDespesa: () => void;
  onAdicionarInvestimento: () => void;
}

export default function AcoesFinanceiras({
  onAdicionarGanho,
  onAdicionarDespesa,
  onAdicionarInvestimento,
}: AcoesFinanceirasProps) {
  return (
    <div className="acoes-financeiras">
      <button className="botao-acao ganho" onClick={onAdicionarGanho}>
        <PlusCircle size={18} />
        <span>Ganho</span>
      </button>

      <button className="botao-acao despesa" onClick={onAdicionarDespesa}>
        <TrendingDown size={18} />
        <span>Despesa</span>
      </button>

      <button
        className="botao-acao investimento"
        onClick={onAdicionarInvestimento}
      >
        <PiggyBank size={18} />
        <span>Investir</span>
      </button>
    </div>
  );
}
