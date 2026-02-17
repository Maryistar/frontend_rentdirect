import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyProperties } from "../api/properties";
import {
  getApplicationsForProperty,
  updateApplicationStatus,
} from "../api/applications";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    try {
      const data = await getMyProperties();

      // Cargar aplicaciones por cada propiedad
      const withApplications = await Promise.all(
        data.map(async (property) => {
          try {
            const apps = await getApplicationsForProperty(property.id);
            return { ...property, applications: apps };
          } catch {
            return { ...property, applications: [] };
          }
        })
      );

      setProperties(withApplications);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus propiedades");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatus(applicationId, status) {
    try {
      await updateApplicationStatus(applicationId, status);
      alert(`Aplicación ${status === "approved" ? "aprobada" : "rechazada"}`);
      loadProperties();
    } catch (err) {
      alert("Error al actualizar la aplicación");
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Cargando propiedades...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 20 }}>Mis Propiedades</h1>

      {properties.length === 0 && (
        <p>No tienes propiedades publicadas todavía.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            {/* IMAGEN */}
            {property.thumbnail ? (
              <img
                src={property.thumbnail}
                alt={property.title}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  height: 180,
                  background: "#eee",
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
            <div style={{ padding: 14 }}>
              <h3 style={{ marginBottom: 6 }}>{property.title}</h3>

              <p style={{ margin: "4px 0" }}>
                <strong>Dirección:</strong> {property.address}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Precio:</strong> ${property.price}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Estado:</strong>{" "}
                <span
                  style={{
                    color:
                      property.status === "Disponible" ? "green" : "gray",
                  }}
                >
                  {property.status}
                </span>
              </p>

              <Link
                to={`/properties/${property.id}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  color: "#2563eb",
                }}
              >
                Ver propiedad →
              </Link>

              {/* APLICACIONES */}
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: "1px solid #eee",
                }}
              >
                <h4 style={{ marginBottom: 8 }}>Aplicaciones</h4>

                {property.applications.length === 0 ? (
                  <p style={{ fontSize: 14, color: "#666" }}>
                    No hay aplicaciones aún
                  </p>
                ) : (
                  property.applications.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        padding: 10,
                        marginBottom: 8,
                        background: "#fafafa",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        <strong>Usuario:</strong> {app.name || app.email}
                      </p>

                      <p style={{ margin: "4px 0" }}>
                        <strong>Mensaje:</strong>{" "}
                        {app.message || "Sin mensaje"}
                      </p>

                      <p style={{ margin: "4px 0" }}>
                        <strong>Estado:</strong>{" "}
                        <span
                          style={{
                            color:
                              app.status === "pending"
                                ? "#d97706"
                                : app.status === "approved"
                                ? "green"
                                : "red",
                          }}
                        >
                          {app.status}
                        </span>
                      </p>

                      {app.status === "pending" && (
                        <div style={{ marginTop: 8 }}>
                          <button
                            onClick={() =>
                              handleStatus(app.id, "approved")
                            }
                            style={{
                              marginRight: 8,
                              padding: "6px 10px",
                              background: "green",
                              color: "#fff",
                              border: "none",
                              borderRadius: 4,
                              cursor: "pointer",
                            }}
                          >
                            Aprobar
                          </button>

                          <button
                            onClick={() =>
                              handleStatus(app.id, "rejected")
                            }
                            style={{
                              padding: "6px 10px",
                              background: "#dc2626",
                              color: "#fff",
                              border: "none",
                              borderRadius: 4,
                              cursor: "pointer",
                            }}
                          >
                            Rechazar
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
