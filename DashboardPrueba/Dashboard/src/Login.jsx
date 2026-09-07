import React from "react";
import { Mail, Lock, School } from "lucide-react";
import "./Login.css";

/**
 * Login — Pantalla de inicio de sesión SIPD-UDES
 * Sistema de Predicción y Seguimiento del Riesgo de Deserción Estudiantil
 *
 * Props:
 *  - onLogin(): callback ejecutado al enviar el formulario
 */
export default function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__icon">
          <School size={30} color="#2C5AA0" />
        </div>

        <h1 className="login-card__title">SIPD-UDES</h1>
        <div className="login-card__institution">UNIVERSIDAD DE SANTANDER</div>
        <p className="login-card__description">
          Sistema de Predicción y Seguimiento del Riesgo de Deserción Estudiantil
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form__label" htmlFor="email">
            Correo Electrónico Institucional
          </label>
          <div className="login-form__field">
            <Mail size={16} className="login-form__icon" />
            <input
              id="email"
              type="email"
              name="email"
              defaultValue="Correo Electrónico"
              autoComplete="email"
            />
          </div>

          <div className="login-form__row">
            <label className="login-form__label" htmlFor="password">
              Contraseña
            </label>
            <a className="login-form__forgot" href="#!">
              ¿Olvidó su contraseña?
            </a>
          </div>
          <div className="login-form__field login-form__field--password">
            <Lock size={16} className="login-form__icon" />
            <input
              id="password"
              type="password"
              name="password"
              defaultValue="••••••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-form__submit">
            Iniciar Sesión
          </button>

          <label className="login-form__remember">
            <input type="checkbox" name="remember" />
            Recordar mi sesión en este equipo
          </label>
        </form>
      </div>

      <div className="login-page__footer">
        © 2026 Universidad de Santander — Facultad de Ingeniería
        <br />
        Prototipo académico · Trabajo de grado SIPD-UDES
      </div>
    </div>
  );
}
