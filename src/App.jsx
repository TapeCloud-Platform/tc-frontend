import React, { useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const isRegisterPage = window.location.pathname === "/api/auth/register" || window.location.pathname === "/register";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (isRegisterPage && password !== confirmPassword) {
      setStatus({ type: "error", message: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegisterPage ? "/api/auth/register" : "/api/auth/login";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("No pudimos validar tus credenciales.");
      }

      const data = await response.json();
      localStorage.setItem("tapecloud_token", data.token);
      setStatus({
        type: "success",
        message: isRegisterPage ? "Cuenta creada correctamente." : "Sesión iniciada correctamente.",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand">
          <img src="/images/TapeCloud.jpeg" alt="Logo de TapeCloud" />
          <span className="brand-name">TapeCloud</span>
        </div>

        <div className="copy">
          <p className="eyebrow">Tu espacio, en un solo lugar</p>
          <h1 id="login-title">{isRegisterPage ? "Crear cuenta" : "Bienvenido de nuevo"}</h1>
          <p className="subtitle">
            {isRegisterPage ? "Registrate para comenzar con TapeCloud." : "Ingresá para continuar con tu experiencia TapeCloud."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="vos@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <div className="field-heading">
            <label htmlFor="password">Contraseña</label>
            {!isRegisterPage && <button type="button" className="text-button">¿La olvidaste?</button>}
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            minLength="6"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {isRegisterPage && (
            <>
              <label htmlFor="confirm-password">Repetir contraseña</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                minLength="6"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </>
          )}

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Procesando..." : isRegisterPage ? "Crear cuenta" : "Iniciar sesión"}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        {status.message && (
          <p className={`status ${status.type}`} role="status">
            {status.message}
          </p>
        )}

        <p className="signup">
          {isRegisterPage ? "¿Ya tenés cuenta?" : "¿Todavía no tenés cuenta?"}{" "}
          <button
            type="button"
            className="text-button"
            onClick={() => { window.location.href = isRegisterPage ? "/" : "/api/auth/register"; }}
          >
            {isRegisterPage ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </p>
      </section>
    </main>
  );
}

export default App;
