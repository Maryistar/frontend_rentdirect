import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/v1/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      navigate("/login");
    }
  };

  // 🔥 REENVIAR CÓDIGO
  const handleResend = async () => {
    if (!email) {
      alert("Ingresa tu correo primero");
      return;
    }

    const res = await fetch("http://localhost:4000/api/v1/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // sin code
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Verificar correo
        </h2>

        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          placeholder="Código de verificación"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          Verificar
        </button>

        <button
          type="button"
          onClick={handleResend}
          className="w-full mt-3 py-2 rounded-full font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition duration-200"
        >
          Reenviar código
        </button>
      </form>
    </div>
  );
}