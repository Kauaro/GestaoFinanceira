import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./ResumoSaldo.css";



type Moeda = "BRL" | "USD" | "EUR";

interface ResumoSaldoProps {
  saldo: number;
}


const SIMBOLOS_MOEDA: Record<Moeda, string> = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
};

const LOCALE_MOEDA: Record<Moeda, string> = {
  BRL: "pt-BR",
  USD: "en-US",
  EUR: "de-DE",
};



export default function ResumoSaldo({ 
  saldo,
  

}: ResumoSaldoProps) {
  const [saldoVisivel, setSaldoVisivel] = useState(true);
  const [moedaSelecionada, setMoedaSelecionada] = useState<Moeda>("BRL");




  const valorFormatado = useMemo(() => {
    const simbolo = SIMBOLOS_MOEDA[moedaSelecionada];

    if (!saldoVisivel) {
      return `${simbolo} ••••••`;
    }
    

    return new Intl.NumberFormat(LOCALE_MOEDA[moedaSelecionada], {
      style: "currency",
      currency: moedaSelecionada,
    }).format(saldo);
  }, [saldo, saldoVisivel, moedaSelecionada]);




  return (

    <div className="card-resumo saldo">
      <header className="cabecalho-saldo">
        <span className="titulo-resumo">Saldo Atual</span>

        <div className="acoes-saldo">
          <button
            type="button"
            className="botao-icone-visualizar"
            onClick={() => setSaldoVisivel((prev) => !prev)}
            aria-label={saldoVisivel ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {saldoVisivel ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>

          <select
            className="seletor-moeda"
            value={moedaSelecionada}
            onChange={(e) => setMoedaSelecionada(e.target.value as Moeda)}
          >
            <option value="BRL">BRL (R$)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </header>

      <strong className="valor-resumo valor-saldo">
        {valorFormatado}
      </strong>

      
    </div>
  );
}
