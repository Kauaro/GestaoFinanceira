import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './ExtratoTotal.css';
import { listarExtratoTotal } from '../../services/extrato';

interface Transacao {
  id: string;
  tipo: 'Ganho' | 'Gasto' | 'Investimento';
  descricao: string;
  valor: number;
  data: string;
  categoria?: string;
}

interface ResumoMes {
  mes: string;
  ganhos: number;
  gastos: number;
  investimentos: number;
  saldo: number;
}

export default function ExtratoTotal() {
  const navigate = useNavigate();
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [resumoMeses, setResumoMeses] = useState<ResumoMes[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
  const carregarTransacoes = async () => {
    try {
      setCarregando(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setCarregando(false);
        return;
      }

      // Chamada única para o extrato completo
      const transacoes = await listarExtratoTotal();

      const mesesMap = new Map<string, ResumoMes>();

      // Processar transações
      transacoes.forEach((t: Transacao) => {
        const data = new Date(t.data);
        const mesSigla = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;

        // Atualizar resumo do mês
        if (!mesesMap.has(mesSigla)) {
          mesesMap.set(mesSigla, {
            mes: mesSigla,
            ganhos: 0,
            gastos: 0,
            investimentos: 0,
            saldo: 0
          });
        }

        const resumo = mesesMap.get(mesSigla)!;

        switch (t.tipo) {
          case 'Ganho':
            resumo.ganhos += t.valor;
            resumo.saldo += t.valor;
            break;
          case 'Gasto':
            resumo.gastos += t.valor;
            resumo.saldo -= t.valor;
            break;
          case 'Investimento':
            resumo.investimentos += t.valor;
            resumo.saldo -= t.valor;
            break;
        }
      });

      // Converter map para array e ordenar
      const resumoArray = Array.from(mesesMap.values()).sort((a, b) =>
        b.mes.localeCompare(a.mes)
      );

      // Ordenar transações por data descendente
      transacoes.sort((a: { data: string | number | Date; }, b: { data: string | number | Date; }) => new Date(b.data).getTime() - new Date(a.data).getTime());

      setTransacoes(transacoes);
      setResumoMeses(resumoArray);
    } catch (erro) {
      console.error('Erro ao carregar transações:', erro);
    } finally {
      setCarregando(false);
    }
  };

  carregarTransacoes();
}, []);


  const totalGanhos = transacoes
    .filter(t => t.tipo === 'Ganho')
    .reduce((acc, t) => acc + t.valor, 0);

  const totalGastos = transacoes
    .filter(t => t.tipo === 'Gasto')
    .reduce((acc, t) => acc + t.valor, 0);

  const totalInvestimentos = transacoes
    .filter(t => t.tipo === 'Investimento')
    .reduce((acc, t) => acc + t.valor, 0);

  const saldoLiquido = totalGanhos - totalGastos - totalInvestimentos;

  const formatarMes = (mesSigla: string) => {
    const [ano, mesNum] = mesSigla.split('-');
    const data = new Date(parseInt(ano), parseInt(mesNum) - 1);
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const obterCor = (tipo: 'Ganho' | 'Gasto' | 'Investimento') => {
  switch (tipo) {
    case 'Ganho':
      return '#10b981'; // verde
    case 'Gasto':
      return '#ef4444'; // vermelho
    case 'Investimento':
      return '#3b82f6'; // azul
    default:
      return '#fff';
  }
};

const obterIcone = (tipo: 'Ganho' | 'Gasto' | 'Investimento') => {
  switch (tipo) {
    case 'Ganho':
      return '↓';
    case 'Gasto':
      return '↑';
    case 'Investimento':
      return '📈';
    default:
      return '•';
  }
};

  return (

    <>
    
    
    <Sidebar />

    <div className="extrato-total-container">

      <div className="extrato-total-content">
        
        <div className="extrato-total-main">
          
          

          <div className="extrato-total-header">
            <button 
              className="botao-voltar"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft size={20} /> Voltar
            </button>
            <div className="extrato-total-titulo">
              <h1>Extrato Completo</h1>
              <p>Visão de todas as suas transações desde o início</p>
            </div>
          </div>

          {/* Resumo Geral */}
          <div className="extrato-total-resumo">
            <div className="resumo-card ganhos">
              <h3>Total Ganhos</h3>
              <p className="valor">R$ {totalGanhos.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="resumo-card gastos">
              <h3>Total Gastos</h3>
              <p className="valor">R$ {totalGastos.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="resumo-card investimentos">
              <h3>Total Investido</h3>
              <p className="valor">R$ {totalInvestimentos.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className={`resumo-card saldo ${saldoLiquido >= 0 ? 'positivo' : 'negativo'}`}>
              <h3>Saldo Total</h3>
              <p className="valor">R$ {saldoLiquido.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>

          
          


          {!carregando && resumoMeses.length > 0 && (
            <div className="extrato-total-meses">
              <h2>Resumo por Mês</h2>
              <div className="tabela-meses">
                {resumoMeses.map((mes) => (
                  <div key={mes.mes} className="linha-mes">
                    <div className="mes-info">
                      <h3>{formatarMes(mes.mes)}</h3>
                    </div>
                    <div className="mes-valores">
                      <div className="valor-mes ganho">
                        <span>Ganhos</span>
                        <strong>+R$ {mes.ganhos.toFixed(2).replace('.', ',')}</strong>
                      </div>
                      <div className="valor-mes gasto">
                        <span>Gastos</span>
                        <strong>-R$ {mes.gastos.toFixed(2).replace('.', ',')}</strong>
                      </div>
                      <div className="valor-mes investimento">
                        <span>Investimentos</span>
                        <strong>R$ {mes.investimentos.toFixed(2).replace('.', ',')}</strong>
                      </div>
                      <div className={`valor-mes saldo ${mes.saldo >= 0 ? 'positivo' : 'negativo'}`}>
                        <span>Saldo</span>
                        <strong>R$ {mes.saldo.toFixed(2).replace('.', ',')}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          


          <div className="extrato-total-transacoes">
            <h2>Todas as Transações</h2>
            
            {carregando ? (
              <div className="carregando">Carregando transações...</div>
            ) : transacoes.length === 0 ? (
              <div className="sem-transacoes">
                <p>Nenhuma transação registrada.</p>
              </div>
            ) : (
              <div className="lista-transacoes">
                {transacoes.map((transacao) => (
                  <div key={`${transacao.tipo}-${transacao.id}`} className="item-transacao">
                    <div className="transacao-info">
                      <div className="transacao-icone" style={{ color: obterCor(transacao.tipo) }}>
                        {obterIcone(transacao.tipo)}
                      </div>
                      <div className="transacao-detalhes">
                        <p className="transacao-descricao">{transacao.descricao}</p>
                        <p className="transacao-categoria">
                          {transacao.categoria || transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)} 
                          {' • '} 
                          {new Date(transacao.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="transacao-valor" style={{ color: obterCor(transacao.tipo) }}>
                      
                      R$ {transacao.valor.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>

    </>
  );
}
