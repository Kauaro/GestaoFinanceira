import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Autenticador/Login/Login";
import Registro from "../pages/Autenticador/Registro/Registro";
import Dashboard from "../pages/Dashboard/Dashboard";
import Ganhos from "../pages/Ganhos/Ganhos";
import Gastos from "../pages/Gastos/Gastos";
import PrivateRoute from "./PrivateRoute";

export default function AppRoute() {
  const handleAdicionarGanho = () => {};
  const handleAdicionarDespesa = () => {};
  const handleAdicionarInvestimento = () => {};

  return (
    <BrowserRouter>
      <Routes>


        {/* Rotas públicas */}

        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />



        {/* Rotas privadas */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard
                onAdicionarGanho={handleAdicionarGanho}
                onAdicionarDespesa={handleAdicionarDespesa}
                onAdicionarInvestimento={handleAdicionarInvestimento}
              />
            </PrivateRoute>
          }
        />





        <Route
          path="/ganhos"
          element={
            <PrivateRoute>
              <Ganhos />
            </PrivateRoute>
          }
        />





        <Route
          path="/gastos"
          element={
            <PrivateRoute>
              <Gastos />
            </PrivateRoute>
          }
        />





        {/* Qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" replace />} />



      </Routes>
    </BrowserRouter>
  );
}
