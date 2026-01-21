import { PlusCircle, TrendingDown, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="acoes-financeiras">
      <button 
        className="botao-acao ganho" 
        onClick={() => {
          onAdicionarGanho();
          navigate("/ganhos");
        }}
      >
        <PlusCircle size={18} />
        <span>Ganho</span>
      </button>

      <button 
        className="botao-acao despesa" 
        onClick={() => {
          onAdicionarDespesa();
          navigate("/gastos");
        }}
      >
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
