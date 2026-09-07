import React from "react";
import {
  LayoutGrid, Users, TrendingUp, Activity, BarChart3, Bell,
  Smile, Meh, Frown, School,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import "./Home.css";

/* ------------------------------------------------------------------ */
/* Datos (vendrán del backend vía API — se dejan aquí como mock)       */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: "dashboard", label: "Inicio", icon: LayoutGrid },
  { key: "estudiantes", label: "Estudiantes", icon: Users },
  { key: "prediccion", label: "Predicción", icon: TrendingUp },
  { key: "seguimiento", label: "Seguimiento", icon: Activity },
  { key: "estadisticas", label: "Estadísticas", icon: BarChart3 },
];

const INDICADORES = {
  total: 1247,
  bajo: { valor: 834, pct: 66.9 },
  medio: { valor: 289, pct: 23.2 },
  alto: { valor: 124, pct: 9.9 },
};

const DISTRIBUCION_PROGRAMA = [
  { programa: "Ing. Software", alto: 62, medio: 55, total: 117 },
  { programa: "Ing. Sistemas", alto: 48, medio: 55, total: 103 },
  { programa: "Ing. Civil", alto: 22, medio: 46, total: 68 },
  { programa: "Ing. Industrial", alto: 20, medio: 47, total: 67 },
  { programa: "Ing. Electrónica", alto: 14, medio: 44, total: 58 },
];
const MAX_PROGRAMA = Math.max(...DISTRIBUCION_PROGRAMA.map((p) => p.total));

const TENDENCIA_SEMESTRE = [
  { periodo: "2023-I", riesgoAlto: 8.4 },
  { periodo: "2023-II", riesgoAlto: 5.1 },
  { periodo: "2024-I", riesgoAlto: 11.8 },
  { periodo: "2024-II", riesgoAlto: 6.7 },
  { periodo: "2025-I", riesgoAlto: 5.8 },
];

const ATENCION_INMEDIATA = [
  { codigo: "EST-1001", nombre: "Juan Sebastián Mora López", programa: "Ing. Software", semestre: 6, probabilidad: 92.3, riesgo: "alto" },
  { codigo: "EST-1002", nombre: "María Camila Restrepo Ortiz", programa: "Ing. Sistemas", semestre: 4, probabilidad: 88.7, riesgo: "alto" },
  { codigo: "EST-1003", nombre: "Andrés Felipe Valencia Castro", programa: "Ing. Civil", semestre: 8, probabilidad: 85.1, riesgo: "alto" },
  { codigo: "EST-1004", nombre: "Paula Daniela Rosero Muñoz", programa: "Ing. Industrial", semestre: 3, probabilidad: 81.4, riesgo: "alto" },
  { codigo: "EST-1005", nombre: "Kevin Andrés Rojas Beltrán", programa: "Ing. Electrónica", semestre: 5, probabilidad: 78.9, riesgo: "alto" },
];

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                      */
/* ------------------------------------------------------------------ */
function Sidebar({ active = "dashboard", onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <School size={17} />
        </div>
        <div>
          <div className="sidebar__brand-name">SIPD-UDES</div>
          <div className="sidebar__brand-sub">UNIVERSIDAD DE SANTANDER</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              className={`sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`}
              onClick={() => onNavigate && onNavigate(item.key)}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__footer-title">FACULTAD DE INGENIERÍA</div>
        <div className="sidebar__footer-version">Versión 2.4.1</div>
      </div>
    </aside>
  );
}

function Header() {
  return (
    <div className="dashboard-header">
      <div>
        <h1 className="dashboard-header__title">
          Sistema de Predicción y Seguimiento del Riesgo de Deserción
        </h1>
        <p className="dashboard-header__subtitle">
          Vista General de Alertas y Desempeño Académico
        </p>
      </div>
      <div className="dashboard-header__actions">
        <div className="dashboard-header__bell">
          <Bell size={19} color="#6B7280" />
          <span className="dashboard-header__bell-dot" />
        </div>
        <div className="dashboard-header__user">
          <div className="dashboard-header__avatar">A</div>
          <div>
            <div className="dashboard-header__user-name">Admin</div>
            <div className="dashboard-header__user-role">Administrador Académico</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndicatorCards() {
  return (
    <div className="indicator-cards">
      <div className="indicator-card">
        <div className="indicator-card__top">
          <div className="indicator-card__icon indicator-card__icon--total">
            <Users size={17} />
          </div>
          <span className="indicator-card__label">TOTAL ESTUDIANTES</span>
        </div>
        <div className="indicator-card__value">{INDICADORES.total.toLocaleString("es-CO")}</div>
        <div className="indicator-card__sub indicator-card__sub--total">Matrícula Activa 2025-I</div>
      </div>

      <div className="indicator-card">
        <div className="indicator-card__top">
          <div className="indicator-card__icon indicator-card__icon--bajo">
            <Smile size={17} />
          </div>
          <span className="indicator-card__label">RIESGO BAJO</span>
        </div>
        <div className="indicator-card__value">
          {INDICADORES.bajo.valor} ({INDICADORES.bajo.pct}%)
        </div>
        <div className="indicator-card__sub indicator-card__sub--bajo">Situación Estable</div>
      </div>

      <div className="indicator-card">
        <div className="indicator-card__top">
          <div className="indicator-card__icon indicator-card__icon--medio">
            <Meh size={17} />
          </div>
          <span className="indicator-card__label">RIESGO MEDIO</span>
        </div>
        <div className="indicator-card__value">
          {INDICADORES.medio.valor} ({INDICADORES.medio.pct}%)
        </div>
        <div className="indicator-card__sub indicator-card__sub--medio">Bajo Monitoreo</div>
      </div>

      <div className="indicator-card">
        <div className="indicator-card__top">
          <div className="indicator-card__icon indicator-card__icon--alto">
            <Frown size={17} />
          </div>
          <span className="indicator-card__label">RIESGO ALTO</span>
        </div>
        <div className="indicator-card__value">
          {INDICADORES.alto.valor} ({INDICADORES.alto.pct}%)
        </div>
        <div className="indicator-card__sub indicator-card__sub--alto">Atención Inmediata</div>
      </div>
    </div>
  );
}

function ProgramDistributionChart() {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <span className="chart-card__title">Distribución de Riesgo por Programa</span>
        <div className="chart-card__legend">
          <span><span className="legend-dot legend-dot--alto">●</span> Alto</span>
          <span><span className="legend-dot legend-dot--medio">●</span> Medio</span>
        </div>
      </div>
      {DISTRIBUCION_PROGRAMA.map((p) => (
        <div className="program-bar-row" key={p.programa}>
          <span className="program-bar-row__label">{p.programa.replace("Ing. ", "")}</span>
          <div className="program-bar-row__track" style={{ width: `${(p.total / MAX_PROGRAMA) * 100}%` }}>
            <div
              className="program-bar-row__segment--alto"
              style={{ width: `${(p.alto / p.total) * 100}%` }}
            />
            <div
              className="program-bar-row__segment--medio"
              style={{ width: `${(p.medio / p.total) * 100}%` }}
            />
          </div>
          <span className="program-bar-row__value">{p.total}</span>
        </div>
      ))}
    </div>
  );
}

function TrendChart() {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <span className="chart-card__title">Tendencia de Riesgo por Semestre</span>
        <span className="chart-card__legend">
          <span className="legend-dot legend-dot--alto">●</span> Riesgo Alto %
        </span>
      </div>
      <ResponsiveContainer width="100%" height={210}>
        <LineChart data={TENDENCIA_SEMESTRE} margin={{ left: -18, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F3" />
          <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E7E9EE" }} />
          <Line type="monotone" dataKey="riesgoAlto" stroke="#D9453A" strokeWidth={2.5} dot={{ r: 4, fill: "#D9453A" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AttentionTable({ onViewStudent, onViewAll }) {
  return (
    <div className="attention-section">
      <div className="attention-section__header">
        <div className="attention-section__title-group">
          <span className="attention-section__title">Estudiantes que Requieren Atención Inmediata</span>
          <span className="attention-section__priority-tag">Alta prioridad</span>
        </div>
        <button className="attention-section__link" onClick={onViewAll}>
          Ver todos los casos de riesgo alto →
        </button>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre Completo</th>
            <th>Programa</th>
            <th>Semestre</th>
            <th>Probabilidad Deserción</th>
            <th>Nivel Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {ATENCION_INMEDIATA.map((s) => (
            <tr key={s.codigo}>
              <td>
                <button
                  className="students-table__code"
                  style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}
                  onClick={() => onViewStudent && onViewStudent(s.codigo)}
                >
                  {s.codigo}
                </button>
              </td>
              <td className="students-table__name">{s.nombre}</td>
              <td className="students-table__muted">{s.programa}</td>
              <td className="students-table__muted">Semestre {s.semestre}</td>
              <td>
                <div className="prob-bar">
                  <div className="prob-bar__track">
                    <div
                      className="prob-bar__fill"
                      style={{ width: `${s.probabilidad}%`, background: "#D9453A" }}
                    />
                  </div>
                  <span className="prob-bar__value" style={{ color: "#D9453A" }}>
                    {s.probabilidad}%
                  </span>
                </div>
              </td>
              <td>
                <span className="risk-badge risk-badge--alto">Alto</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vista principal                                                     */
/* ------------------------------------------------------------------ */
/**
 * Dashboard — Vista "Inicio" del SIPD-UDES
 *
 * Props:
 *  - onNavigate(key): cambia de sección vía el sidebar
 *  - onViewStudent(codigo): abre el perfil de un estudiante
 *  - onViewAllRisk(): navega al listado filtrado por riesgo alto
 */
export default function Dashboard({ onNavigate, onViewStudent, onViewAllRisk }) {
  return (
    <div className="dashboard-layout">
      <Sidebar active="dashboard" onNavigate={onNavigate} />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <IndicatorCards />
          <div className="charts-row">
            <ProgramDistributionChart />
            <TrendChart />
          </div>
          <AttentionTable onViewStudent={onViewStudent} onViewAll={onViewAllRisk} />
        </div>
      </div>
    </div>
  );
}
