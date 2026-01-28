import "./Investimentos.css";
import { useEffect, useState } from "react";
import { obterInvestimentos } from "../../services/investimento";

type Investimento = {
  id: number;
  descricao: string;
  valorAplicado: number;
  dataAplicacao: string;
  categoria: string;
};

export default function ListaInvestimentos() {
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarInvestimentos() {
      try {
        const dados = await obterInvestimentos();
        setInvestimentos(dados);
      } catch (error) {
        console.error("Erro ao carregar investimentos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarInvestimentos();
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando investimentos...</p>;
  }

  return (
    <div className="container-investimentos-lista-ultimos">
      <h2>Todos os Investimentos</h2>

      {investimentos.length === 0 ? (
        <p style={{ padding: 20 }}>Nenhum investimento cadastrado.</p>
      ) : (
        <ul className="lista-investimentos">
          {investimentos.map((investimento) => (
            <li key={investimento.id} className="item-investimento">
              <div className="item-info">
                <span className="item-descricao">{investimento.descricao}</span>
                <span className="item-categoria">{investimento.categoria}</span>
              </div>

              <span className="valor-investimento">
                R$ {investimento.valorAplicado.toFixed(2)}
              </span>

              <span className="data-investimento">
                {new Date(investimento.dataAplicacao).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
