import { NavLink } from "react-router-dom";
import "./Sidebar.css";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function SidebarItem({ to, icon, label }: SidebarItemProps) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) =>
        isActive ? "sidebar-item ativo" : "sidebar-item"
      }
    >
      <span className="sidebar-icone">{icon}</span>
      <span className="sidebar-texto">{label}</span>
    </NavLink>
  );
}
