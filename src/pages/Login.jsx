import { useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      alert("Login exitoso 🎉");
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button disabled={loading} style={styles.button}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footer}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={styles.link}>
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

/* =========================
   ESTILOS
========================= */
const styles = {
  page: {
    minHeight: "calc(100vh - 80px)", // deja visible la navbar
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dfdceaff",
  },
  card: {
    width: "100%",
    maxWidth: 450,
    padding: "28px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "22px",
    fontWeight: 700,
  },
  input: {
    width: "90%",
    marginBottom: "14px",
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #111f34ff",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "991px",
    fontWeight: 600,
    marginTop: "7px",
  },
  error: {
    color: "#dc2626",
    marginTop: "12px",
    textAlign: "center",
    fontSize: "14px",
  },
  footer: {
    marginTop: "18px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#1556e2ff",
    fontWeight: 600,
  },
};
