import { useState } from "react";
import "./Ganhos.css";
import { criarGanho } from "../../services/ganhos";

export default function AdicionarGanhos() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const novoGanho = {
        descricao,
        valor: Number(valor),
        categoria: tipo,       
        pagamento,
        dataGanho: data,       
      };

      await criarGanho(novoGanho);

      alert("Ganho cadastrado com sucesso!");

      
      

      setDescricao("");
      setValor("");
      setTipo("");
      setPagamento("");
      setData("");

      

    } catch (error) {
      console.error("Erro ao cadastrar ganho:", error);
      alert("Erro ao cadastrar ganho");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-formulario">
      <h2 className="titulo-card">Adicionar Ganho</h2>

      <form onSubmit={handleSubmit} className="formulario-ganho">
        <div className="campo-formulario">
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Salário, Freelance..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="campo-formulario">
          <label>Valor</label>
          <input
            type="number"
            placeholder="Ex: 2500"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="campo-formulario">
          <label>Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            <option value="Salário">Salário</option>
            <option value="Freelance">Freelance</option>
            <option value="Investimento">Investimento</option>
            <option value="Bônus">Bônus</option>
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

        <button type="submit" className="botao-primario" disabled={loading}>
          {loading ? "Salvando..." : "Adicionar Ganho"}
        </button>
      </form>
    </div>
  );
}
