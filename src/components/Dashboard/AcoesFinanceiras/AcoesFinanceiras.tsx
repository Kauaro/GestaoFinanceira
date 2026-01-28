import { PlusCircle, TrendingDown, PiggyBank, FileText, Receipt } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  // ✅ useLocation deve ficar **dentro do componente**
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const anoQuery = query.get("ano");
  const mesQuery = query.get("mes");

  const [showMesModal, setShowMesModal] = useState(false);

  // Inicializa o mês selecionado com query ou mês atual
  const [mesSelecionado, setMesSelecionado] = useState(() => {
    if (anoQuery && mesQuery) {
      const mesFormatado = mesQuery.padStart(2, "0");
      return `${anoQuery}-${mesFormatado}`;
    }
    return new Date().toISOString().slice(0, 7);
  });

  const abrirExtratoMensal = () => {
    const [ano, mes] = mesSelecionado.split("-");
    navigate(`/usuario/extrato-mensal?ano=${ano}&mes=${parseInt(mes)}`);
    setShowMesModal(false);
  };

  return (
    <div className="acoes-financeiras-wrapper">
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
          onClick={() => {
            onAdicionarInvestimento();
            navigate("/investimentos");
          }}
        >
          <PiggyBank size={18} />
          <span>Investir</span>
        </button>
      </div>

      <div className="acoes-extrato">
        <div className="card-acao-extrato">
          <button
            className="botao-acao extrato-mes"
            onClick={() => setShowMesModal(true)}
          >
            <Receipt size={18} />
            <span>Extrato Mês</span>
          </button>
        </div>

        <div className="card-acao-extrato">
          <button
            className="botao-acao extrato-total"
            onClick={() => navigate("/extrato-total")}
          >
            <FileText size={18} />
            <span>Extrato Total</span>
          </button>
        </div>
      </div>

      {showMesModal && (
        <>
          <div
            className="modal-backdrop-extrato"
            onClick={() => setShowMesModal(false)}
          ></div>
          <div className="modal-extrato-mes">
            <div className="modal-extrato-header">
              <h2>Extrato do Mês</h2>
              <button
                className="modal-extrato-close"
                onClick={() => setShowMesModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-extrato-content">
              <label>Selecione o mês:</label>
              <input
                type="month"
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(e.target.value)}
              />
            </div>

            <div className="modal-extrato-actions">
              <button
                className="botao-cancelar-extrato"
                onClick={() => setShowMesModal(false)}
              >
                Cancelar
              </button>
              <button
                className="botao-visualizar-extrato"
                onClick={abrirExtratoMensal}
              >
                Visualizar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
