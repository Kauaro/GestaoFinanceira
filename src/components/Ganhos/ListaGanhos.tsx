import { useEffect, useState } from "react";
import { listarGanhos } from "../../services/ganhos";

type Ganho = {
  id: number;
  descricao: string;
  valor: number;
  dataGanho: string;
};

export default function ListaGanhos() {
  const [ganhos, setGanhos] = useState<Ganho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarGanhos() {
      try {
        const dados = await listarGanhos(); 
        setGanhos(dados);
      } catch (error) {
        console.error("Erro ao listar ganhos:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarGanhos();
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Carregando ganhos...</p>;
  }

  return (
    <div className="container-ganhos-lista">
      <h2>Últimos Ganhos</h2>

      {ganhos.length === 0 ? (
        <p>Nenhum ganho registrado ainda.</p>
      ) : (
        <ul className="lista-ganhos">
          {ganhos.map((ganho) => (
            <li key={ganho.id} className="item-ganho">
              <span>{ganho.descricao}</span>

              <span className="valor-ganho">
                + R$ {ganho.valor.toFixed(2)}
              </span>

              <span className="data-ganho">
                {new Date(ganho.dataGanho).toLocaleDateString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
