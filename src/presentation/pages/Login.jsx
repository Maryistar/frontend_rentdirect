import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../application/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      if (err.message?.includes("verify your email")) {
        setError("Tu cuenta no está verificada.");
      } else {
        setError(err.message || "Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#dfdcea] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Iniciar sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {error && (
          <div className="text-center mt-4">
            <p className="text-red-500 text-sm">{error}</p>

            {error === "Tu cuenta no está verificada." && (
              <button
                type="button"
                onClick={() => navigate("/verify-email")}
                className="mt-2 text-blue-600 font-semibold underline"
              >
                Ir a verificar correo
              </button>
            )}
          </div>
        )}

        <p className="text-sm text-center mt-6">
          ¿Se te olvidó la contraseña?{" "}
          <Link
            to="/forgot-password"
            className="text-blue-600 font-semibold hover:underline"
          >
            Cambiar contraseña
          </Link>
        </p>

        <p className="text-sm text-center mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}