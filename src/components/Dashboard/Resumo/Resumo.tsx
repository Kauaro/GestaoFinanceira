import "./Resumo.css";

interface ResumoCardProps {
  titulo: string;
  valor: string;
  tipo?: "receita" | "despesa" | "investimento";
}

export default function ResumoCard({
  titulo,
  valor,
  tipo = "receita",
}: ResumoCardProps) {
  return (
    <div className={`card-resumo ${tipo}`}>
      <span className="titulo-resumo">{titulo}</span>
      <strong className="valor-resumo">{valor}</strong>
    </div>
  );
}
