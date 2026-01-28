import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { listarExtratoMensal } from '../../services/extrato'; // API unificada
import './ExtratoMes.css';

interface TransacaoDTO {
  id: string;
  tipo: 'Ganho' | 'Gasto' | 'Investimento';
  descricao: string;
  valor: number;
  data: string;
  categoria?: string;
}

export default function ExtratoMes() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const ano = query.get('ano');
  const mes = query.get('mes');

  const [transacoes, setTransacoes] = useState<TransacaoDTO[]>([]);
  const [carregando, setCarregando] = useState(true);

  const formatarMes = () => {
    if (!ano || !mes) return '';
    const data = new Date(parseInt(ano), parseInt(mes) - 1);
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  useEffect(() => {
    const carregarTransacoes = async () => {
      try {
        if (!ano || !mes) return;
        setCarregando(true);

        const extrato = await listarExtratoMensal(ano, mes);

        // Ordenar por data descendente
        const transacoesOrdenadas = extrato.sort(
          (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
        );

        setTransacoes(transacoesOrdenadas);
      } catch (erro) {
        console.error('Erro ao carregar transações:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarTransacoes();
  }, [ano, mes]);

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

  const obterCor = (tipo: string) => {
    switch (tipo) {
      case 'Ganho': return '#10b981';
      case 'Gasto': return '#ef4444';
      case 'Investimento': return '#3b82f6';
      default: return '#fff';
    }
  };

  const obterIcone = (tipo: string) => {
    switch (tipo) {
      case 'Ganho': return '↓';
      case 'Gasto': return '↑';
      case 'Investimento': return '💰';
      default: return '•';
    }
  };

  return (
    <>
      <Sidebar />
      <div className="extrato-mes-container">
        <div className="extrato-mes-content">
          <div className="extrato-mes-main">
            {/* Header */}
            <div className="extrato-mes-header">
              <button className="botao-voltar" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={20} /> Voltar
              </button>
              <div className="extrato-mes-titulo">
                <h1>Extrato de {formatarMes()}</h1>
                <p>Visão completa de todas as suas transações</p>
              </div>
            </div>

            {/* Resumo */}
            <div className="extrato-mes-resumo">
              <div className="resumo-card ganhos">
                <h3>Ganhos</h3>
                <p className="valor">R$ {totalGanhos.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="resumo-card gastos">
                <h3>Gastos</h3>
                <p className="valor">R$ {totalGastos.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="resumo-card investimentos">
                <h3>Investimentos</h3>
                <p className="valor">R$ {totalInvestimentos.toFixed(2).replace('.', ',')}</p>
              </div>
              <div className={`resumo-card saldo ${saldoLiquido >= 0 ? 'positivo' : 'negativo'}`}>
                <h3>Saldo Líquido</h3>
                <p className="valor">R$ {saldoLiquido.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>

            {/* Lista de Transações */}
            <div className="extrato-mes-transacoes">
              <h2>Transações do Mês</h2>
              {carregando ? (
                <div className="carregando">Carregando transações...</div>
              ) : transacoes.length === 0 ? (
                <div className="sem-transacoes">
                  <p>Nenhuma transação registrada para este mês.</p>
                </div>
              ) : (
                <div className="lista-transacoes">
                  {transacoes.map(t => (
                    <div key={`${t.tipo}-${t.id}`} className="item-transacao">
                      <div className="transacao-info">
                        <div className="transacao-icone" style={{ color: obterCor(t.tipo) }}>
                          {obterIcone(t.tipo)}
                        </div>
                        <div className="transacao-detalhes">
                          <p className="transacao-descricao">{t.descricao}</p>
                          <p className="transacao-categoria">{t.categoria || t.tipo}</p>
                        </div>
                      </div>
                      <div className="transacao-valor" style={{ color: obterCor(t.tipo) }}>
                        {(t.tipo === 'Gasto' || t.tipo === 'Investimento' ? '-' : '+')} 
                        R$ {t.valor.toFixed(2).replace('.', ',')}
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
