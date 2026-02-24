import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../../infrastructure/api/properties";
import { applyToProperty } from "../../infrastructure/api/applications";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError("No se pudo cargar la propiedad");
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  async function handleApply() {
    try {
      setApplying(true);
      setError("");
      setSuccess("");

      await applyToProperty(property.id, "Estoy interesado en esta propiedad");

      setSuccess("✅ Aplicación enviada correctamente");
    } catch (err) {
      setError(err.message || "Error al aplicar a la propiedad");
    } finally {
      setApplying(false);
    }
  }

  if (loading) return <p>Cargando propiedad...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!property) return <p>Propiedad no encontrada</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/">← Volver a propiedades</Link>

      <h1 style={{ marginTop: "10px" }}>{property.title}</h1>

      {/* GALERÍA */}
      {property.images && property.images.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {property.images.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt="Propiedad"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          ))}
        </div>
      ) : (
        <p>Esta propiedad no tiene imágenes</p>
      )}

      {/* INFO */}
      <p>
        <strong>Dirección:</strong>{" "}
        {property.address || "No especificada"}
      </p>
      <p>
        <strong>Precio:</strong> ${property.price}
      </p>
      <p>
        <strong>Estado:</strong> {property.status}
      </p>

      {property.description && (
        <>
          <h3>Descripción</h3>
          <p>{property.description}</p>
        </>
      )}

      {/* BOTÓN APLICAR */}
      <button
        onClick={handleApply}
        disabled={applying}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          fontSize: "16px",
          cursor: applying ? "not-allowed" : "pointer",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          opacity: applying ? 0.7 : 1,
        }}
      >
        {applying ? "Aplicando..." : "Aplicar a esta propiedad"}
      </button>

      {success && (
        <p style={{ color: "green", marginTop: "12px" }}>{success}</p>
      )}
    </div>
  );
}
