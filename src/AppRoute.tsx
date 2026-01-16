import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Autenticador/Login/Login';
import Registro from './pages/Autenticador/Registro/Registro';
import Dashboard from './pages/Dashboard/Dashboard';


export default function AppRoute() {
  const handleAdicionarGanho = () => {
    // Add implementation
  };

  const handleAdicionarDespesa = () => {
    // Add implementation
  };

  const handleAdicionarInvestimento = () => {
    // Add implementation
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />


        <Route path="/dashboard" element={<Dashboard onAdicionarGanho={handleAdicionarGanho} onAdicionarDespesa={handleAdicionarDespesa} onAdicionarInvestimento={handleAdicionarInvestimento} />} />

      </Routes>
    </BrowserRouter>
  );
}
