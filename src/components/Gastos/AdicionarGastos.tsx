import { useState } from "react";
import "./Gastos.css";
import { criarGasto } from "../../services/gastos";

export default function AdicionarGastos() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const novoGasto = {
        descricao,
        valor: Number(valor),
        categoria,
        pagamento,
        dataGasto: data, 
      };

      await criarGasto(novoGasto);

      
      setDescricao("");
      setValor("");
      setCategoria("");
      setPagamento("");
      setData("");

      alert("Gasto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
      alert("Erro ao adicionar gasto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-formulario">
      <h2 className="titulo-card">Adicionar Gasto</h2>

      <form onSubmit={handleSubmit} className="formulario-gasto">
        <div className="campo-formulario">
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Aluguel, Alimentação..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="campo-formulario">
          <label>Valor</label>
          <input
            type="number"
            placeholder="Ex: 1500"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="campo-formulario">
          <label>Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Moradia">Moradia</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Lazer">Lazer</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="campo-formulario">
          <label>Pagamento</label>
          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            required
          >
            <option value="">Selecione forma de pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Pix">Pix</option>
          </select>
        </div>

        <div className="campo-formulario">
          <label>Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="botao-primario"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Adicionar Gasto"}
        </button>
      </form>
    </div>
  );
}
