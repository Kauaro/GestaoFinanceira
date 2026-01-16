import "./TransacoesLista.css";

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa";
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
            <span>{item.descricao}</span>
            <span className={item.tipo}>
              {item.tipo === "despesa" ? "-" : "+"} R$ {item.valor}
            </span>
            <span className="data-transacao">{item.data}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
