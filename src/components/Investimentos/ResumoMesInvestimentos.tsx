import "./Investimentos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resgatarInvestimento , obterInvestimentos } from "../../services/investimento";
import { PiggyBank, ArrowRight, X } from "lucide-react";


export default function ResumoMesInvestimentos() {
  const [totalMes, setTotalMes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [valorRetirada, setValorRetirada] = useState("");
  const [origem, setOrigem] = useState<"investimento" | "cofrinho">("investimento");
  const [loadingRetirada, setLoadingRetirada] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarResumo() {
      try {
        const investimentos = await obterInvestimentos();
        const total = investimentos.reduce((acc: number, inv: any) => acc + inv.valorAplicado, 0);
        setTotalMes(total);
      } catch (error) {
        console.error("Erro ao carregar resumo de investimentos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarResumo();
  }, []);

  async function handleRetirada(e: React.FormEvent) {
  e.preventDefault();

  try {
    setLoadingRetirada(true);

    const valor = Number(valorRetirada);

    if (!valor || valor <= 0) {
      alert("Insira um valor válido");
      return;
    }

    if (valor > totalMes) {
      alert("Valor de retirada maior que o saldo disponível");
      return;
    }

    function mapearCategoria(origem: "investimento" | "cofrinho") {
      return origem === "investimento" ? "Investimento" : "Poupança";
      }


    await resgatarInvestimento({
      valor,
      categoria: mapearCategoria(origem),
      dataResgate: new Date().toISOString().split("T")[0],
    });

    alert("Retirada realizada com sucesso!");

    setValorRetirada("");
    setOrigem("investimento");
    setShowModal(false);

    // Recarregar saldo
    const investimentos = await obterInvestimentos();
    const total = investimentos.reduce(
      (acc: number, inv: any) => acc + inv.valorAplicado,
      0
    );
    setTotalMes(total);
  } catch (error) {
    console.error("Erro ao retirar investimento:", error);
    alert("Erro ao retirar investimento");
  } finally {
    setLoadingRetirada(false);
  }
}


  return (

    <div>

        <button 
      onClick={() => setShowModal(true)}
      className="botao-retirada"
    >
      Retirar Investimento
    </button>


    <div className="cards">
    <div className="card-resumo-investimentos">
      <div className="resumo-investimentos-content">
        <span className="resumo-label">Investimento do Mês</span>
        <span className="resumo-valor-investimentos">
          R$ {totalMes.toFixed(2)}
        </span>
      </div>
    </div>

    <div className="card-resumo-investimentos">
      <div className="resumo-investimentos-content">
        <span className="resumo-label"> <PiggyBank size={24} /> Cofrinho</span>
        
        <span className="resumo-valor-investimentos"> 
          R$ {totalMes.toFixed(2)}  
        </span>
      </div>
    </div>
    </div>

    <button 
      onClick={() => navigate("/investimentos")}
      className="botao-ver-todos"
    >
      Ver Todos os Investimentos
      <ArrowRight size={18} />
    </button>

    








    {showModal && (
      <>
        <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
        <div className="modal-retirada">
          <div className="modal-header">
            <h2>Retirar Investimento</h2>
            <button 
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleRetirada} className="modal-form">
            <div className="campo-formulario">
                <label>De Onde Retirar?</label>
              <select
                  value={origem}
                  onChange={(e) => setOrigem(e.target.value as "investimento" | "cofrinho")}
                  required
                    >
                      <option value="investimento">Investimento</option>
                      <option value="cofrinho">Poupança</option>
              </select>

            </div>

            <div className="campo-formulario">
              
              <label>Valor a Retirar</label>
              <input
                type="number"
                placeholder="Ex: 1000"
                value={valorRetirada}
                onChange={(e) => setValorRetirada(e.target.value)}
                max={totalMes}
                step="0.01"
                required
              />
              <small className="saldo-disponivel">
                Saldo disponível: R$ {totalMes.toFixed(2)}
              </small>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="botao-cancelar"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="botao-confirmar"
                disabled={loadingRetirada}
              >
                {loadingRetirada ? "Processando..." : "Confirmar Retirada"}
              </button>
            </div>
          </form>
        </div>
      </>
    )}







    </div>
  );
}
