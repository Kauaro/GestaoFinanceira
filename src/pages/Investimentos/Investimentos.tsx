import AdicionarInvestimentos from "../../components/Investimentos/AdicionarInvestimentos";
import ListaInvestimentos from "../../components/Investimentos/ListaInvestimentos";
import ResumoMesInvestimentos from "../../components/Investimentos/ResumoMesInvestimentos";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "./Investimentos.css";

export default function Investimentos() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar />
      
        <div className="container-dashboard">
          <div className="header-investimentos">
            <h1 className="titulo-pagina">Investimentos</h1>
            <p className="subtitulo-pagina">Acompanhe e gerencie seus investimentos com inteligência</p>
          </div>

          <div className="container-investimentos">
            <AdicionarInvestimentos />
            <ResumoMesInvestimentos />
            <ListaInvestimentos />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
