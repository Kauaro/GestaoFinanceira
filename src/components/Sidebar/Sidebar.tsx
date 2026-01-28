import { 
  LayoutDashboard, 
  TrendingDown, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Settings, 
  LogOut 
} from "lucide-react";
import Logo from "../../images/logo.png";

import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-topo">
        
        
      </div>

      <nav className="sidebar-menu">
        <img src={Logo} alt="Logo MinhasFinanças" className="sidebar-logo-imagem" />
        <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarItem to="/gastos" icon={<TrendingDown size={20} />} label="Gastos" />
        <SidebarItem to="/ganhos" icon={<TrendingUp size={20} />} label="Ganhos" />
        <SidebarItem to="/investimentos" icon={<PiggyBank size={20} />} label="Investimentos" />
      </nav>

      <div className="sidebar-rodape">
        <SidebarItem to="/logout" icon={<LogOut size={20} />} label="Sair" />
      </div>
    </aside>
  );
}
