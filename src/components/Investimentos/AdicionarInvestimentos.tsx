import { useState } from "react";
import "./Investimentos.css";
import { criarInvestimento } from "../../services/investimento";

export default function AdicionarInvestimentos() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const novoInvestimento = {
        descricao,
        categoria,
        valorAplicado: Number(valor),
        dataAplicacao: data,
      };

      await criarInvestimento(novoInvestimento);

      setDescricao("");
      setValor("");
      setCategoria("");
      setData("");

      alert("Investimento adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar investimento:", error);
      alert("Erro ao adicionar investimento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-formulario">
      <h2 className="titulo-card">Adicionar Investimento</h2>

      <form onSubmit={handleSubmit} className="formulario-investimento">
        <div className="campo-formulario">
          <label>Descrição</label>
          <input
            type="text"
            placeholder="Ex: Ações da Apple, ETF de Renda Fixa..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="campo-formulario">
          <label>Valor</label>
          <input
            type="number"
            placeholder="Ex: 5000"
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
            <option value="Investimento">Investimento</option>
            <option value="Poupança">Poupança</option>
          </select>
        </div>

        <div className="campo-formulario">
          <label>Data do Investimento</label>
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
          {loading ? "Adicionando..." : "Adicionar Investimento"}
        </button>
      </form>
    </div>
  );
}
