import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-14 grid gap-10 md:grid-cols-3">
        
        {/* Logo / Descripción */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Rent Direct
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Arrendamientos sin intermediarios.
            Conectamos propietarios e inquilinos de forma directa,
            segura y rápida.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Enlaces
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/my-properties" className="hover:text-white transition">
                Mis Propiedades
              </Link>
            </li>
            <li>
              <Link to="/applications" className="hover:text-white transition">
                Mis Aplicaciones
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white transition">
                Perfil
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contacto
          </h4>
          <p className="text-sm text-gray-400">
            rentdirectonline@gmail.com
          </p>
          <p className="text-sm text-gray-400">
            Medellín, Colombia
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Rent Direct Online —
        Todos los derechos reservados
      </div>
    </footer>
  );
}
