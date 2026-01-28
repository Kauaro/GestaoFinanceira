import "./TransacoesLista.css";

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa" | "investimento";
  categoria: string;
  data: string;
}

interface Props {
  transacoes: Transacao[];
}

export default function ListaTransacoes({ transacoes }: Props) {
  return (
    <div className="container-transacoes">
      <h2>Últimas transações</h2>

      <ul className="lista-transacoes">
        {transacoes.map((item) => (
          <li key={item.id} className="item-transacao">
            <div className="item-info">
              <span className="item-descricao">{item.descricao}</span>
              <span className="item-categoria">{item.categoria}</span>
            </div>

            <span className={`tipo-transacao ${item.tipo}`}>
              {item.tipo === "receita" && "Ganho"}
              {item.tipo === "despesa" && "Gasto"}
              {item.tipo === "investimento" && "Investimento"}
            </span>

            <span className={`valor-transacao ${item.tipo}`}>
              {item.tipo === "despesa" ? "-" : "+"} R$ {item.valor.toFixed(2)}
            </span>
            
            <span className="data-transacao">{new Date(item.data).toLocaleDateString("pt-BR")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
