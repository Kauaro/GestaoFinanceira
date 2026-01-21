import { 
  LayoutDashboard, 
  TrendingDown, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Settings, 
  LogOut 
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-topo">
        <h2 className="sidebar-logo">MinhasFinanças</h2>
      </div>

      <nav className="sidebar-menu">
        <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarItem to="/gastos" icon={<TrendingDown size={20} />} label="Gastos" />
        <SidebarItem to="/ganhos" icon={<TrendingUp size={20} />} label="Ganhos" />
        <SidebarItem to="/investimentos" icon={<PiggyBank size={20} />} label="Investimentos" />
        <SidebarItem to="/cartoes" icon={<CreditCard size={20} />} label="Cartões" />
      </nav>

      <div className="sidebar-rodape">
        <SidebarItem to="/configuracoes" icon={<Settings size={20} />} label="Configurações" />
        <SidebarItem to="/logout" icon={<LogOut size={20} />} label="Sair" />
      </div>
    </aside>
  );
}
