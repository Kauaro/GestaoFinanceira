import FormularioGanho from "../../components/Ganhos/AdicionarGanhos";
import ListaGanhos from "../../components/Ganhos/ListaGanhos";
import ResumoMesGanhos from "../../components/Ganhos/ResumoMesGanhos";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "./Ganhos.css";

export default function Ganhos() {
  return (
    <>
      <div className="dashboard-wrapper">
        <Sidebar />
      
        <div className="container-dashboard">
          <div className="header-ganhos">
            <h1 className="titulo-pagina"> Ganhos</h1>
            <p className="subtitulo-pagina">Controle seus rendimentos e acompanhe o progresso</p>
          </div>

          <div className="container-ganhos">
            <FormularioGanho />
            <ResumoMesGanhos />
            <ListaGanhos />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
