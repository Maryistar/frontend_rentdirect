export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo / Descripción */}
        <div className="footer-section">
          <h3 className="footer-logo">Rent Direct</h3>
          <p>
            Arrendamientos sin intermediarios. 
            Conectamos propietarios e inquilinos de forma directa, segura y rápida.
          </p>
        </div>

        {/* Navegación */}
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/my-properties">Mis Propiedades</a></li>
            <li><a href="/my-applications">Mis Aplicaciones</a></li>
            <li><a href="/profile">Perfil</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: rentdirectonline@gmail.com</p>
          <p>Medellín, Colombia</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Rent Direct Online - Todos los derechos reservados
      </div>
    </footer>
  );
}
