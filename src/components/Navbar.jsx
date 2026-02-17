import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">RentDirect</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>

        {token && user?.role === "owner" && (
          <>
            <Link to="/my-properties">Mis Propiedades</Link>
            <Link to="/create-property">Publicar</Link>
          </>
        )}

        {token && user?.role === "tenant" && (
          <Link to="/my-applications">Mis Aplicaciones</Link>
        )}

        {token ? (
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}
