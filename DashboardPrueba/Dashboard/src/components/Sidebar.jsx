import { Activity, LayoutGrid, School, Users } from "lucide-react";
import "./Sidebar.css";

const NAV_ITEMS = [
  { key: "dashboard", label: "Inicio", icon: LayoutGrid },
  { key: "estudiantes", label: "Estudiantes", icon: Users },
  { key: "intervenciones", label: "Intervenciones", icon: Activity },
];

export default function Sidebar({ active = "dashboard", onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon"><School size={17} /></div>
        <div>
          <div className="sidebar__brand-name">SIPD-UDES</div>
          <div className="sidebar__brand-sub">UNIVERSIDAD DE SANTANDER</div>
        </div>
      </div>
      <nav className="sidebar__nav" aria-label="Navegación principal">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={`sidebar__nav-item ${active === key ? "sidebar__nav-item--active" : ""}`}
            onClick={() => onNavigate?.(key)}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div className="sidebar__footer-title">FACULTAD DE INGENIERÍA</div>
        <div className="sidebar__footer-version">Versión 2.4.1</div>
      </div>
    </aside>
  );
}
