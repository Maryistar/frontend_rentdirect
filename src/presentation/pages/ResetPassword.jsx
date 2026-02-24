import { useState } from "react";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    code: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/v1/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cambiar contraseña</h2>

      <input
        type="email"
        name="email"
        placeholder="Correo"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="code"
        placeholder="Código recibido"
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="newPassword"
        placeholder="Nueva contraseña"
        onChange={handleChange}
        required
      />

      <button type="submit">Cambiar contraseña</button>
    </form>
  );
}