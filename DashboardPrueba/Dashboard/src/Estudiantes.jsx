import React, { useMemo, useState } from "react";
import {
  LayoutGrid, Users, TrendingUp, Activity, BarChart3, Bell,
  School, Search, Plus,
} from "lucide-react";
import "./Estudiantes.css";

/* ------------------------------------------------------------------ */
/* Datos simulados (vendrán del backend vía API más adelante)          */
/* Total fijado en 1,247 para ser consistente con la vista de Inicio   */
/* (834 bajo / 289 medio / 124 alto), igual que en el Figma.           */
/* ------------------------------------------------------------------ */
const NAV_ITEMS = [
  { key: "dashboard", label: "Inicio", icon: LayoutGrid },
  { key: "estudiantes", label: "Estudiantes", icon: Users },
  { key: "prediccion", label: "Predicción", icon: TrendingUp },
  { key: "seguimiento", label: "Seguimiento", icon: Activity },
  { key: "estadisticas", label: "Estadísticas", icon: BarChart3 },
];

const PROGRAMAS = ["Ing. Software", "Ing. Sistemas", "Ing. Civil", "Ing. Industrial", "Ing. Electrónica"];

const NOMBRES = [
  "Juan Sebastián", "María Camila", "Andrés Felipe", "Paula Daniela", "Kevin Andrés",
  "Daniela Sofía", "Santiago Mateo", "Valentina", "Laura Sofía", "Carlos Andrés",
  "Diego Alejandro", "Natalia", "Juan David", "Camila Andrea", "Sebastián",
  "Isabella", "Mariana", "Nicolás", "Gabriela", "Alejandro",
  "Luisa Fernanda", "Tomás", "Sara Valentina", "Miguel Ángel", "Ana Sofía",
];
const APELLIDOS = [
  "Mora López", "Restrepo Ortiz", "Valencia Castro", "Rosero Muñoz", "Rojas Beltrán",
  "Patiño Arango", "Cruz Holguín", "Gómez Aristizábal", "Ramírez Duarte", "Suárez Peña",
  "Vargas Nieto", "Cárdenas Rico", "Muñoz Salazar", "Torres Cabezas", "Rodríguez Peña",
  "Gutiérrez Fajardo", "Martínez Ospina", "Sánchez Villa", "Pérez Cadena", "Jiménez Rueda",
];

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260901);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => Math.round((min + rand() * (max - min)) * 10) / 10;
const betweenInt = (min, max) => Math.floor(min + rand() * (max - min + 1));

function generarPorNivel(nivel) {
  if (nivel === "Alto") {
    return {
      promedio: between(2.0, 3.1),
      asistencia: betweenInt(50, 75),
      probabilidad: between(70, 95),
    };
  }
  if (nivel === "Medio") {
    return {
      promedio: between(2.9, 3.6),
      asistencia: betweenInt(70, 88),
      probabilidad: between(40, 69),
    };
  }
  return {
    promedio: between(3.5, 5.0),
    asistencia: betweenInt(85, 100),
    probabilidad: between(4, 39),
  };
}

// Filas fijas idénticas a la captura del Figma
const FILAS_FIJAS = [
  { codigo: "EST-1001", nombre: "Juan Sebastián Mora López", programa: "Ing. Software", semestre: 6, promedio: 2.9, asistencia: 72, riesgo: "Alto", probabilidad: 85.3 },
  { codigo: "EST-1002", nombre: "María Camila Restrepo Ortiz", programa: "Ing. Sistemas", semestre: 4, promedio: 3.1, asistencia: 80, riesgo: "Alto", probabilidad: 72.1 },
  { codigo: "EST-1003", nombre: "Andrés Felipe Valencia Castro", programa: "Ing. Civil", semestre: 8, promedio: 3.4, asistencia: 88, riesgo: "Medio", probabilidad: 48.5 },
  { codigo: "EST-1004", nombre: "Paula Daniela Rosero Muñoz", programa: "Ing. Industrial", semestre: 3, promedio: 2.8, asistencia: 65, riesgo: "Alto", probabilidad: 91.2 },
  { codigo: "EST-1005", nombre: "Kevin Andrés Rojas Beltrán", programa: "Ing. Electrónica", semestre: 5, promedio: 3.2, asistencia: 83, riesgo: "Medio", probabilidad: 51.4 },
  { codigo: "EST-1006", nombre: "Daniela Sofía Patiño Arango", programa: "Ing. Software", semestre: 2, promedio: 4.2, asistencia: 95, riesgo: "Bajo", probabilidad: 12.0 },
  { codigo: "EST-1007", nombre: "Santiago Mateo Cruz Holguín", programa: "Ing. Sistemas", semestre: 7, promedio: 3.7, asistencia: 91, riesgo: "Bajo", probabilidad: 18.3 },
  { codigo: "EST-1008", nombre: "Valentina Gómez Aristizábal", programa: "Ing. Civil", semestre: 9, promedio: 3.0, asistencia: 74, riesgo: "Medio", probabilidad: 55.0 },
];

function construirDataset() {
  const TOTAL = 1247;
  // Presupuesto restante tras las 8 filas fijas (3 Alto, 3 Medio, 2 Bajo)
  const restante = { Alto: 124 - 3, Medio: 289 - 3, Bajo: 834 - 2 };
  const bolsa = [];
  Object.entries(restante).forEach(([nivel, cantidad]) => {
    for (let i = 0; i < cantidad; i++) bolsa.push(nivel);
  });
  // barajar de forma determinista
  for (let i = bolsa.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [bolsa[i], bolsa[j]] = [bolsa[j], bolsa[i]];
  }

  const generadas = bolsa.map((nivel, idx) => {
    const { promedio, asistencia, probabilidad } = generarPorNivel(nivel);
    return {
      codigo: `EST-${1009 + idx}`,
      nombre: `${pick(NOMBRES)} ${pick(APELLIDOS)}`,
      programa: pick(PROGRAMAS),
      semestre: betweenInt(1, 10),
      promedio,
      asistencia,
      riesgo: nivel,
      probabilidad: Math.round(probabilidad * 10) / 10,
    };
  });

  const dataset = [...FILAS_FIJAS, ...generadas];
  return dataset.length === TOTAL ? dataset : dataset.slice(0, TOTAL);
}

const ESTUDIANTES = construirDataset();

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                      */
/* ------------------------------------------------------------------ */
function Sidebar({ active = "estudiantes", onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon"><School size={17} /></div>
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
    <div className="students-header">
      <div>
        <h1 className="students-header__title">
          Sistema de Predicción y Seguimiento del Riesgo de Deserción
        </h1>
        <p className="students-header__subtitle">
          Filtros avanzados, predicciones e historiales individuales
        </p>
      </div>
      <div className="students-header__actions">
        <div className="students-header__bell">
          <Bell size={19} color="#6B7280" />
          <span className="students-header__bell-dot" />
        </div>
        <div className="students-header__user">
          <div className="students-header__avatar">A</div>
          <div>
            <div className="students-header__user-name">Admin</div>
            <div className="students-header__user-role">Administrador Académico</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function riskBadgeClass(nivel) {
  if (nivel === "Alto") return "risk-badge risk-badge--alto";
  if (nivel === "Medio") return "risk-badge risk-badge--medio";
  return "risk-badge risk-badge--bajo";
}

/* ------------------------------------------------------------------ */
/* Vista principal                                                     */
/* ------------------------------------------------------------------ */
const PAGE_SIZE = 8;

/**
 * Estudiantes — Vista "Gestión de Estudiantes" del SIPD-UDES
 *
 * Props:
 *  - onNavigate(key): cambia de sección vía el sidebar
 *  - onViewStudent(codigo): abre el perfil individual del estudiante
 *  - onAddStudent(): callback del botón "Registrar Estudiante"
 */
export default function Estudiantes({ onNavigate, onViewStudent, onAddStudent }) {
  const [search, setSearch] = useState("");
  const [programa, setPrograma] = useState("Todos");
  const [semestre, setSemestre] = useState("Todos");
  const [riesgo, setRiesgo] = useState("Todos");
  const [page, setPage] = useState(1);

  const filtrados = useMemo(() => {
    return ESTUDIANTES.filter((s) => {
      const matchSearch =
        search.trim() === "" ||
        s.nombre.toLowerCase().includes(search.toLowerCase()) ||
        s.codigo.toLowerCase().includes(search.toLowerCase());
      const matchPrograma = programa === "Todos" || s.programa === programa;
      const matchSemestre = semestre === "Todos" || s.semestre === Number(semestre);
      const matchRiesgo = riesgo === "Todos" || s.riesgo === riesgo;
      return matchSearch && matchPrograma && matchSemestre && matchRiesgo;
    });
  }, [search, programa, semestre, riesgo]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const paginaActual = Math.min(page, totalPages);
  const filas = filtrados.slice((paginaActual - 1) * PAGE_SIZE, paginaActual * PAGE_SIZE);

  const cambiarFiltro = (setter) => (value) => { setter(value); setPage(1); };

  // Números de página a mostrar: 1, 2, 3, ..., última
  const paginasVisibles = [1, 2, 3].filter((n) => n <= totalPages);
  const mostrarEllipsis = totalPages > 4;

  return (
    <div className="students-layout">
      <Sidebar active="estudiantes" onNavigate={onNavigate} />
      <div className="students-main">
        <Header />
        <div className="students-content">
          <div className="students-titlebar">
            <div className="students-titlebar__left">
              <h2 className="students-titlebar__title">Gestión de Estudiantes</h2>
              <span className="students-titlebar__badge">
                {filtrados.length.toLocaleString("es-CO")} Registros
              </span>
            </div>
            <button className="students-titlebar__add" onClick={onAddStudent}>
              <Plus size={15} /> Registrar Estudiante
            </button>
          </div>

          <div className="students-panel">
            <div className="students-filters">
              <div className="students-filters__search">
                <Search size={15} color="#6B7280" />
                <input
                  value={search}
                  onChange={(e) => cambiarFiltro(setSearch)(e.target.value)}
                  placeholder="Buscar por nombre, código o identificación..."
                />
              </div>
              <select
                className="students-filters__select"
                value={programa}
                onChange={(e) => cambiarFiltro(setPrograma)(e.target.value)}
              >
                <option value="Todos">Programa: Todos</option>
                {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <select
                className="students-filters__select"
                value={semestre}
                onChange={(e) => cambiarFiltro(setSemestre)(e.target.value)}
              >
                <option value="Todos">Semestre: Todos</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>Semestre {n}</option>
                ))}
              </select>
              <select
                className="students-filters__select"
                value={riesgo}
                onChange={(e) => cambiarFiltro(setRiesgo)(e.target.value)}
              >
                <option value="Todos">Riesgo: Todos</option>
                <option value="Alto">Alto</option>
                <option value="Medio">Medio</option>
                <option value="Bajo">Bajo</option>
              </select>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Estudiante</th>
                    <th>Programa</th>
                    <th>Semestre</th>
                    <th>Promedio</th>
                    <th>Asistencia</th>
                    <th>Nivel Riesgo</th>
                    <th>Probabilidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((s) => (
                    <tr key={s.codigo}>
                      <td>
                        <button
                          className="students-table__code"
                          onClick={() => onViewStudent && onViewStudent(s.codigo)}
                        >
                          {s.codigo}
                        </button>
                      </td>
                      <td className="students-table__name">{s.nombre}</td>
                      <td className="students-table__muted">{s.programa}</td>
                      <td className="students-table__muted">Semestre {s.semestre}</td>
                      <td className={`students-table__value ${s.promedio < 3 ? "students-table__value--danger" : ""}`}>
                        {s.promedio.toFixed(1)}
                      </td>
                      <td className={`students-table__value ${s.asistencia < 75 ? "students-table__value--danger" : ""}`}>
                        {s.asistencia}%
                      </td>
                      <td><span className={riskBadgeClass(s.riesgo)}>{s.riesgo}</span></td>
                      <td className="students-table__value" style={{
                        color: s.riesgo === "Alto" ? "#D9453A" : s.riesgo === "Medio" ? "#DB9A1F" : "#279A55",
                      }}>
                        {s.probabilidad.toFixed(1)}%
                      </td>
                      <td>
                        <button
                          className="students-table__action"
                          onClick={() => onViewStudent && onViewStudent(s.codigo)}
                        >
                          Ver Perfil →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="students-pagination">
              <span>
                Mostrando registros del {(paginaActual - 1) * PAGE_SIZE + 1} al{" "}
                {Math.min(paginaActual * PAGE_SIZE, filtrados.length)} de{" "}
                {filtrados.length.toLocaleString("es-CO")}
              </span>
              <div className="students-pagination__pages">
                <button
                  className="students-pagination__btn"
                  disabled={paginaActual === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>
                {paginasVisibles.map((n) => (
                  <button
                    key={n}
                    className={`students-pagination__page ${n === paginaActual ? "students-pagination__page--active" : ""}`}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}
                {mostrarEllipsis && <span className="students-pagination__ellipsis">…</span>}
                {totalPages > 3 && (
                  <button
                    className={`students-pagination__page ${totalPages === paginaActual ? "students-pagination__page--active" : ""}`}
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  className="students-pagination__btn"
                  disabled={paginaActual === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
