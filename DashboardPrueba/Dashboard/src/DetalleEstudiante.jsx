import React from "react";
import {
  Bell,
  ArrowLeft, UserRound, MonitorCheck, BookOpen, CalendarDays, AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import "./DetalleEstudiante.css";
import Sidebar from "./components/Sidebar.jsx";

/* ------------------------------------------------------------------ */
/* Datos del estudiante (vendrán del backend vía API — GET /estudiantes/{id}/) */
/* Aquí se deja el caso de EST-1001, consistente con la tabla de la     */
/* vista Estudiantes.                                                   */
/* ------------------------------------------------------------------ */
const ESTUDIANTE_DEMO = {
  codigo: "EST-1001",
  nombre: "Juan Sebastián Mora López",
  programa: "Ing. Software",
  semestre: 6,
  riesgo: "Alto",
  probabilidad: 85.3,
  factores: [
    { label: "Asistencia", valor: 72, unidad: "%", critico: true },
    { label: "Promedio académico", valor: 2.9, unidad: "", max: 5, critico: true },
    { label: "Materias reprobadas", valor: 3, unidad: "", max: 5, critico: true },
    { label: "Interacción con plataforma", valor: 34, unidad: "%", critico: true },
  ],
  evolucion: [
    { semestre: "S1", promedio: 3.8 },
    { semestre: "S2", promedio: 3.6 },
    { semestre: "S3", promedio: 3.4 },
    { semestre: "S4", promedio: 3.2 },
    { semestre: "S5", promedio: 3.0 },
    { semestre: "S6", promedio: 2.9 },
  ],
  asistenciaPeriodo: [
    { mes: "Ago", asistencia: 78 },
    { mes: "Sep", asistencia: 74 },
    { mes: "Oct", asistencia: 70 },
    { mes: "Nov", asistencia: 66 },
  ],
  interaccion: {
    accesosSemanales: 6,
    entregasATiempo: 41,
    participacionForos: 22,
  },
  alertas: [
    { tipo: "Asistencia por debajo del 75%", fecha: "28 Ago 2026", prioridad: "Alta" },
    { tipo: "3 materias reprobadas en el periodo", fecha: "20 Ago 2026", prioridad: "Alta" },
    { tipo: "Baja interacción con plataforma educativa", fecha: "15 Ago 2026", prioridad: "Media" },
  ],
  recomendacion:
    "Se sugiere agendar una tutoría académica esta semana y remitir al programa de acompañamiento estudiantil. La combinación de asistencia baja y materias reprobadas es el patrón de mayor peso en la predicción.",
};

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                       */
/* ------------------------------------------------------------------ */
function Header() {
  return (
    <div className="detail-header">
      <div>
        <h1 className="detail-header__title">Perfil de Riesgo Individual</h1>
        <p className="detail-header__subtitle">
          Factores, evolución académica y alertas tempranas para seguimiento docente
        </p>
      </div>
      <div className="detail-header__actions">
        <div className="detail-header__bell">
          <Bell size={19} color="#6B7280" />
          <span className="detail-header__bell-dot" />
        </div>
        <div className="detail-header__user">
          <div className="detail-header__avatar">A</div>
          <div>
            <div className="detail-header__user-name">Admin</div>
            <div className="detail-header__user-role">Administrador Académico</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function riskBadgeClass(nivel) {
  if (nivel === "Alto") return "risk-badge risk-badge--lg risk-badge--alto";
  if (nivel === "Medio") return "risk-badge risk-badge--lg risk-badge--medio";
  return "risk-badge risk-badge--lg risk-badge--bajo";
}

function riskColor(nivel) {
  if (nivel === "Alto") return "#D9453A";
  if (nivel === "Medio") return "#DB9A1F";
  return "#279A55";
}

function alertClass(prioridad) {
  if (prioridad === "Alta") return "alert-item alert-item--alta";
  if (prioridad === "Media") return "alert-item alert-item--media";
  return "alert-item alert-item--baja";
}

function alertIconColor(prioridad) {
  if (prioridad === "Alta") return "#D9453A";
  if (prioridad === "Media") return "#DB9A1F";
  return "#6B7280";
}

/* ------------------------------------------------------------------ */
/* Vista principal                                                       */
/* ------------------------------------------------------------------ */
/**
 * DetalleEstudiante — Perfil de riesgo individual.
 * Vista que consultan docentes, asesores y directivos para revisar
 * el caso completo de un estudiante: factores de riesgo, evolución
 * académica, asistencia, interacción con la plataforma y alertas
 * tempranas, con una recomendación de acción a seguir.
 *
 * Props:
 *  - estudiante: objeto con los datos del estudiante (por defecto usa
 *    un caso demo — en producción vendrá de GET /api/estudiantes/{id}/)
 *  - onNavigate(key): cambia de sección vía el sidebar
 *  - onBack(): vuelve al listado de Estudiantes
 */
export default function DetalleEstudiante({
  estudiante = ESTUDIANTE_DEMO,
  onNavigate,
  onBack,
}) {
  const s = estudiante;

  return (
    <div className="detail-layout">
      <Sidebar active="estudiantes" onNavigate={onNavigate} />
      <div className="detail-main">
        <Header />
        <div className="detail-content">
          <button className="detail-back" onClick={onBack}>
            <ArrowLeft size={15} /> Volver a Estudiantes
          </button>

          {/* Resumen del estudiante */}
          <div className="student-summary">
            <div className="student-summary__left">
              <div className="student-summary__avatar">
                <UserRound size={26} color="#2C5AA0" />
              </div>
              <div>
                <div className="student-summary__name">{s.nombre}</div>
                <div className="student-summary__meta">
                  {s.codigo} · {s.programa} · Semestre {s.semestre}
                </div>
                <div className="student-summary__advisor">
                  Docente responsable: por asignar · Asesor académico: por asignar
                </div>
              </div>
            </div>
            <div className="student-summary__right">
              <span className={riskBadgeClass(s.riesgo)}>{s.riesgo}</span>
              <div className="student-summary__prob" style={{ color: riskColor(s.riesgo) }}>
                {s.probabilidad}%
              </div>
              <div className="student-summary__prob-label">probabilidad de deserción (modelo ML)</div>
            </div>
          </div>

          {/* Factores + Evolución académica */}
          <div className="detail-row">
            <div className="detail-panel">
              <div className="detail-panel__title">Principales Factores Asociados al Riesgo</div>
              {s.factores.map((f) => {
                const pct = f.max ? (f.valor / f.max) * 100 : f.valor;
                return (
                  <div className="factor-item" key={f.label}>
                    <div className="factor-item__top">
                      <span className="factor-item__label">{f.label}</span>
                      <span className={`factor-item__value ${f.critico ? "factor-item__value--danger" : "factor-item__value--ok"}`}>
                        {f.valor}{f.unidad}
                      </span>
                    </div>
                    <div className="factor-item__track">
                      <div
                        className={`factor-item__fill ${f.critico ? "factor-item__fill--danger" : "factor-item__fill--ok"}`}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="detail-panel">
              <div className="detail-panel__title">Evolución Académica</div>
              <ResponsiveContainer width="100%" height={190}>
                <LineChart data={s.evolucion} margin={{ left: -18, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F3" />
                  <XAxis dataKey="semestre" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[1, 5]} tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E7E9EE" }} />
                  <Line type="monotone" dataKey="promedio" stroke="#2C5AA0" strokeWidth={2.5} dot={{ r: 4, fill: "#2C5AA0" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asistencia + Interacción con plataforma */}
          <div className="detail-row">
            <div className="detail-panel">
              <div className="detail-panel__title">Asistencia por Periodo</div>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={s.asistenciaPeriodo} margin={{ left: -18, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F3" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E7E9EE" }} />
                  <Bar dataKey="asistencia" fill="#2C5AA0" radius={[6, 6, 0, 0]} barSize={26} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="detail-panel">
              <div className="detail-panel__title">Interacción con Plataforma Educativa</div>
              <div className="metric-row">
                <div className="metric-row__left">
                  <div className="metric-row__icon"><MonitorCheck size={15} /></div>
                  <span className="metric-row__label">Accesos semanales promedio</span>
                </div>
                <span className="metric-row__value">{s.interaccion.accesosSemanales}</span>
              </div>
              <div className="metric-row">
                <div className="metric-row__left">
                  <div className="metric-row__icon"><BookOpen size={15} /></div>
                  <span className="metric-row__label">Entregas a tiempo</span>
                </div>
                <span className="metric-row__value">{s.interaccion.entregasATiempo}%</span>
              </div>
              <div className="metric-row">
                <div className="metric-row__left">
                  <div className="metric-row__icon"><CalendarDays size={15} /></div>
                  <span className="metric-row__label">Participación en foros</span>
                </div>
                <span className="metric-row__value">{s.interaccion.participacionForos}%</span>
              </div>
            </div>
          </div>

          {/* Alertas tempranas + recomendación para el docente/directivo */}
          <div className="detail-panel">
            <div className="detail-panel__title">Alertas Tempranas</div>
            {s.alertas.map((a, i) => (
              <div key={i} className={alertClass(a.prioridad)}>
                <div className="alert-item__left">
                  <AlertTriangle size={15} color={alertIconColor(a.prioridad)} />
                  <span className="alert-item__type">{a.tipo}</span>
                </div>
                <div className="alert-item__right">
                  <span className="alert-item__date">{a.fecha}</span>
                  <span className="alert-item__priority" style={{ color: alertIconColor(a.prioridad) }}>
                    {a.prioridad}
                  </span>
                </div>
              </div>
            ))}

            <div className="recommendation-box" style={{ marginTop: 14 }}>
              <div className="recommendation-box__title">Recomendación para seguimiento</div>
              {s.recomendacion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
