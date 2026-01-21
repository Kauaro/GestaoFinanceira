import { useEffect, useState } from "react";
import { listarGastos } from "../../services/gastos";

type Gasto = {
  id: number;
  descricao: string;
  valor: number;
  dataGasto: string;
};

export default function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarGastos() {
      try {
        const dados = await listarGastos();
        setGastos(dados);
      } catch (error) {
        console.error("Erro ao carregar gastos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarGastos();
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando gastos...</p>;
  }

  return (
    <div className="container-gastos-lista">
      <h2>Últimos Gastos</h2>

      {gastos.length === 0 ? (
        <p style={{ padding: 20 }}>Nenhum gasto cadastrado.</p>
      ) : (
        <ul className="lista-gastos">
          {gastos.map((gasto) => (
            <li key={gasto.id} className="item-gasto">
              <span>{gasto.descricao}</span>

              <span className="valor-gasto">
                - R$ {gasto.valor.toFixed(2)}
              </span>

              <span className="data-gasto">
                {new Date(gasto.dataGasto).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
