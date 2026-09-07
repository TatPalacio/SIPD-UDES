import React, { useState } from "react";
import "./Seguimiento.css";

const ESTUDIANTES = [
  { codigo: "EST-1001", nombre: "Juan Sebastián Mora" },
  { codigo: "EST-1002", nombre: "Andrea Gómez" },
  { codigo: "EST-1003", nombre: "Valentina Ríos" },
  { codigo: "EST-1004", nombre: "Sebastián Vargas" },
  { codigo: "EST-1005", nombre: "Camilo Torres" },
  { codigo: "EST-1008", nombre: "Laura Mendoza" },
];

const TIPOS_INTERVENCION = [
  "Tutoría académica",
  "Llamada telefónica",
  "Remisión a bienestar",
  "Reunión con acudiente",
  "Apoyo financiero",
  "Consejería académica",
];

const RESPONSABLES = [
  "Prof. Ana García",
  "Coord. Luis Herrera",
  "Prof. María López",
  "Dir. Pedro Sánchez",
  "Coord. Diana Ruiz",
  "Prof. Carlos Ramírez",
];

const ESTADOS = [
  "Pendiente",
  "Contactado",
  "En acompañamiento",
  "En seguimiento",
  "Cerrado",
];

const INTERVENCIONES_INICIALES = [
  {
    id: 1,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1001",
    estudianteNombre: "Juan Sebastián Mora",
    tipo: "Tutoría académica",
    observaciones: "Se programó plan de estudio personalizado con seguimiento quincenal.",
    responsable: "Prof. Ana García",
    estado: "En acompañamiento",
  },
  {
    id: 2,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1003",
    estudianteNombre: "Valentina Ríos",
    tipo: "Llamada telefónica",
    observaciones: "No se logró contacto, se reintentará la próxima semana.",
    responsable: "Coord. Luis Herrera",
    estado: "Pendiente",
  },
  {
    id: 3,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1005",
    estudianteNombre: "Camilo Torres",
    tipo: "Remisión a bienestar",
    observaciones: "Derivado a psicología por reporte de estrés académico.",
    responsable: "Prof. María López",
    estado: "En seguimiento",
  },
  {
    id: 4,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1002",
    estudianteNombre: "Andrea Gómez",
    tipo: "Reunión con acudiente",
    observaciones: "Madre informada sobre bajo rendimiento en dos asignaturas.",
    responsable: "Dir. Pedro Sánchez",
    estado: "Contactado",
  },
  {
    id: 5,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1008",
    estudianteNombre: "Laura Mendoza",
    tipo: "Apoyo financiero",
    observaciones: "Se gestionó beca de sostenimiento para el próximo semestre.",
    responsable: "Coord. Diana Ruiz",
    estado: "Cerrado",
  },
  {
    id: 6,
    fecha: "12/05/2025",
    estudianteCodigo: "EST-1004",
    estudianteNombre: "Sebastián Vargas",
    tipo: "Consejería académica",
    observaciones: "Ajuste de carga académica para el siguiente periodo.",
    responsable: "Prof. Carlos Ramírez",
    estado: "En acompañamiento",
  },
];

const ESTADO_CLASES = {
  Pendiente: "badge--pendiente",
  Contactado: "badge--contactado",
  "En acompañamiento": "badge--acompanamiento",
  "En seguimiento": "badge--seguimiento",
  Cerrado: "badge--cerrado",
};

const FORM_INICIAL = {
  estudianteCodigo: "",
  tipo: TIPOS_INTERVENCION[0],
  observaciones: "",
  responsable: RESPONSABLES[0],
  estado: ESTADOS[2],
};

function formatearFecha(date) {
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const anio = date.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

export default function Seguimiento() {
  const [intervenciones, setIntervenciones] = useState(INTERVENCIONES_INICIALES);
  const [filtroEstudiante, setFiltroEstudiante] = useState("todos");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroResponsable, setFiltroResponsable] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("semestre");
  const [form, setForm] = useState(FORM_INICIAL);

  const activasHoy = intervenciones.filter(
    (item) => item.estado !== "Cerrado"
  ).length;

  const filasFiltradas = intervenciones.filter((item) => {
    if (filtroEstudiante !== "todos" && item.estudianteCodigo !== filtroEstudiante) {
      return false;
    }
    if (filtroEstado !== "todos" && item.estado !== filtroEstado) {
      return false;
    }
    if (filtroResponsable !== "todos" && item.responsable !== filtroResponsable) {
      return false;
    }
    return true;
  });

  const handleFormChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const handleCancelar = () => {
    setForm(FORM_INICIAL);
  };

  const handleGuardar = () => {
    if (!form.estudianteCodigo || !form.observaciones.trim()) {
      return;
    }
    const estudiante = ESTUDIANTES.find((e) => e.codigo === form.estudianteCodigo);
    const nuevaIntervencion = {
      id: Date.now(),
      fecha: formatearFecha(new Date()),
      estudianteCodigo: estudiante.codigo,
      estudianteNombre: estudiante.nombre,
      tipo: form.tipo,
      observaciones: form.observaciones.trim(),
      responsable: form.responsable,
      estado: form.estado,
    };
    setIntervenciones((prev) => [nuevaIntervencion, ...prev]);
    setForm(FORM_INICIAL);
  };

  return (
    <div className="seg-page">
      <header className="seg-header">
        <div>
          <h1 className="seg-title">Seguimiento e Intervenciones</h1>
          <p className="seg-subtitle">
            Registro, control y acompañamiento para estudiantes con alertas preventivas activas
          </p>
        </div>
      </header>

      <section className="seg-panel">
        <div className="seg-panel-top">
          <div className="seg-panel-heading">
            <h2>Bitácora de Intervenciones</h2>
            <span className="seg-pill">{activasHoy} Activas hoy</span>
          </div>
          <button type="button" className="btn btn--primary" onClick={handleGuardar}>
            <span className="btn-icon">+</span>
            Nueva Intervención
          </button>
        </div>

        <div className="seg-filtros">
          <label className="seg-filtro">
            <span>Estudiante</span>
            <select
              value={filtroEstudiante}
              onChange={(e) => setFiltroEstudiante(e.target.value)}
            >
              <option value="todos">Todos los estudiantes</option>
              {ESTUDIANTES.map((est) => (
                <option key={est.codigo} value={est.codigo}>
                  {est.codigo} · {est.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="seg-filtro">
            <span>Estado</span>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="todos">Todos los estados</option>
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </label>

          <label className="seg-filtro">
            <span>Responsable</span>
            <select
              value={filtroResponsable}
              onChange={(e) => setFiltroResponsable(e.target.value)}
            >
              <option value="todos">Todos los responsables</option>
              {RESPONSABLES.map((resp) => (
                <option key={resp} value={resp}>
                  {resp}
                </option>
              ))}
            </select>
          </label>

          <label className="seg-filtro">
            <span>Fecha</span>
            <select value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)}>
              <option value="semestre">Este semestre</option>
              <option value="mes">Este mes</option>
              <option value="semana">Esta semana</option>
            </select>
          </label>
        </div>

        <div className="seg-tabla-wrap">
          <table className="seg-tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estudiante</th>
                <th>Tipo Intervención</th>
                <th>Observaciones</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filasFiltradas.map((item) => (
                <tr key={item.id}>
                  <td>{item.fecha}</td>
                  <td>
                    <a className="seg-estudiante-link" href={`#${item.estudianteCodigo}`}>
                      {item.estudianteCodigo}
                    </a>
                    <div className="seg-estudiante-nombre">{item.estudianteNombre}</div>
                  </td>
                  <td>{item.tipo}</td>
                  <td className="seg-observaciones" title={item.observaciones}>
                    {item.observaciones}
                  </td>
                  <td>{item.responsable}</td>
                  <td>
                    <span className={`badge ${ESTADO_CLASES[item.estado]}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="seg-link-btn">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {filasFiltradas.length === 0 && (
                <tr>
                  <td colSpan={7} className="seg-vacio">
                    No hay intervenciones que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="seg-form-card">
        <h3 className="seg-form-titulo">
          <span className="seg-form-icono">+</span>
          Registrar Nueva Intervención
        </h3>

        <div className="seg-form-grid">
          <label className="seg-campo">
            <span>Estudiante</span>
            <select
              value={form.estudianteCodigo}
              onChange={handleFormChange("estudianteCodigo")}
            >
              <option value="">Seleccione o busque estudiante (código o nombre)...</option>
              {ESTUDIANTES.map((est) => (
                <option key={est.codigo} value={est.codigo}>
                  {est.codigo} · {est.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="seg-campo">
            <span>Tipo de Intervención</span>
            <select value={form.tipo} onChange={handleFormChange("tipo")}>
              {TIPOS_INTERVENCION.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="seg-campo seg-campo--full">
          <span>Observaciones</span>
          <textarea
            rows={3}
            value={form.observaciones}
            onChange={handleFormChange("observaciones")}
            placeholder="Describa la intervención realizada..."
          />
        </label>

        <div className="seg-form-grid">
          <label className="seg-campo">
            <span>Responsable</span>
            <select value={form.responsable} onChange={handleFormChange("responsable")}>
              {RESPONSABLES.map((resp) => (
                <option key={resp} value={resp}>
                  {resp}
                </option>
              ))}
            </select>
          </label>

          <label className="seg-campo">
            <span>Estado</span>
            <select value={form.estado} onChange={handleFormChange("estado")}>
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="seg-form-acciones">
          <button type="button" className="btn btn--ghost" onClick={handleCancelar}>
            Cancelar
          </button>
          <button type="button" className="btn btn--primary" onClick={handleGuardar}>
            Guardar Intervención
          </button>
        </div>
      </section>
    </div>
  );
}
