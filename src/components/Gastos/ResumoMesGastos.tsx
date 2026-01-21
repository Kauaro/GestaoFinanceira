import { useEffect, useState } from "react";
import { totalMesAtual } from "../../services/gastos";

export default function ResumoMesGastos() {
  const [totalMes, setTotalMes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarResumo() {
      try {
        const total = await totalMesAtual();
        setTotalMes(total);
      } catch (error) {
        console.error("Erro ao carregar resumo de gastos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarResumo();
  }, []);

  if (loading) {
    return (
      <div className="card-resumo-gastos">
        <div className="resumo-gastos-content">
          <span className="resumo-label">Gasto do Mês</span>
          <span className="resumo-valor">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-resumo-gastos">
      <div className="resumo-gastos-content">
        <span className="resumo-label">Gasto do Mês</span>
        <span className="resumo-valor">
          R$ {totalMes.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
