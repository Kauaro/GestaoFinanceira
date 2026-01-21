import AdicionarGastos from "../../components/Gastos/AdicionarGastos";
import ListaGastos from "../../components/Gastos/ListaGastos";
import ResumoMesGastos from "../../components/Gastos/ResumoMesGastos";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "./Gastos.css";

export default function Gastos() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar />
      
        <div className="container-dashboard">
          <div className="header-gastos">
            <h1 className="titulo-pagina"> Gastos</h1>
            <p className="subtitulo-pagina">Acompanhe suas despesas e gerencie seu orçamento</p>
          </div>

          <div className="container-gastos">
            <AdicionarGastos />
            <ResumoMesGastos />
            <ListaGastos />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

