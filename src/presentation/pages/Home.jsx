import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../../infrastructure/api/properties";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las propiedades");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Propiedades disponibles</h1>

      {properties.length === 0 && (
        <p>No hay propiedades publicadas</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              {/* IMAGEN */}
              {property.thumbnail ? (
                <img
                  src={`http://localhost:4000/${property.thumbnail}`}
                  alt={property.title || "Propiedad"}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "200px",
                    background: "#735c5cff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                  }}
                >
                  Sin imagen
                </div>
              )}

              {/* INFO */}
              <div style={{ padding: "12px" }}>
                <h3 style={{ margin: "0 0 8px 0" }}>
                  {property.title || "Sin título"}
                </h3>

                <p style={{ margin: "4px 0" }}>
                  <strong>Dirección:</strong>{" "}
                  {property.address || "No especificada"}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Precio:</strong>{" "}
                  {property.price ? `$${property.price}` : "N/A"}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Estado:</strong> {property.status}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    
  );
}
