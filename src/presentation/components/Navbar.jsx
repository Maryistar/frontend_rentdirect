import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../application/context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        RentDirect
      </Link>

      {/* Links */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Inicio
        </Link>

        {user?.role === "owner" && (
          <>
            <Link
              to="/my-properties"
              className="px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Mis Propiedades
            </Link>

            <Link
              to="/create-property"
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              Publicar
            </Link>
          </>
        )}

        {user?.role === "tenant" && (
          <Link
            to="/my-applications"
            className="px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Mis Aplicaciones
          </Link>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}