import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../infrastructure/api/properties";

export default function CreateProperty() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleImages(e) {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreview(previews);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("address", address);
      formData.append("price", price);
      formData.append("description", description);

      images.forEach(img => formData.append("images", img));

      await createProperty(formData);

      alert("Propiedad creada con éxito 🏠✨");
      navigate("/my-properties");
    } catch (err) {
      setError(err.message || "Error al crear la propiedad");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <center> <h1 style={styles.title}>Crear nueva propiedad</h1> </center>
        <center> <p style={styles.subtitle}>
          Completa la información para publicar tu propiedad
        </p> </center>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Apartamento moderno en el centro de la ciudad"
              required
            />
          </div>

          <div style={styles.field}>
            <label>Dirección</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ej: Calle 45 #12-30"
            />
          </div>
          
          <div style={styles.field}>
            <label>Precio mensual</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ej: 1200000"
              required
            />
          </div>

          <div style={styles.field}>
            <label>Descripción</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu propiedad..."
            />
          </div>

          <div style={styles.field}>
            <label>Imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />
          </div>

          {/* Preview imágenes */}
          {preview.length > 0 && (
            <div style={styles.previewGrid}>
              {preview.map((src, i) => (
                <img key={i} src={src} alt="preview" style={styles.previewImg} />
              ))}
            </div>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button disabled={loading} style={styles.button}>
            {loading ? "Publicando..." : "Publicar propiedad"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* =======================
   ESTILOS
======================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fa",
    padding: "40px 16px",
  },
  card: {
    maxWidth: 600,
    margin: "0 auto",
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 20,
    color: "#666",
    fontSize: 14,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 14,
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: 10,
    marginBottom: 16,
  },
  previewImg: {
    width: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    padding: 14,
    marginTop: 10,
    border: "none",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
};
