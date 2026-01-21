import { useEffect, useState } from "react";
import { totalMesAtual } from "../../services/ganhos";

export default function ResumoMesGanhos() {
  const [totalMes, setTotalMes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarTotal() {
      try {
        const total = await totalMesAtual();
        setTotalMes(total);
      } catch (error) {
        console.error("Erro ao buscar ganhos do mês:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarTotal();
  }, []);

  if (loading) {
    return (
      <div className="card-resumo-ganhos">
        <div className="resumo-ganhos-content">
          <span className="resumo-label">Ganho do Mês</span>
          <span className="resumo-valor-ganho">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-resumo-ganhos">
      <div className="resumo-ganhos-content">
        <span className="resumo-label">Ganho do Mês</span>
        <span className="resumo-valor-ganho">
          R$ {totalMes.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
