import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000/api/v1";

export default function Profile() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);

  /* =========================
     CARGAR PERFIL
  ========================= */
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`${API_BASE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar perfil");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  /* =========================
     SUBIR FOTO
  ========================= */
  async function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setPhotoLoading(true);

      const res = await fetch(`${API_BASE}/users/me/documents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir tu imagen")

      const data = await res.json();

      setUser((prev) => ({
        ...prev,
        avatar: data.url || prev.avatar,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setPhotoLoading(false);
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Cargando perfil...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* =========================
            FOTO + INFO
        ========================= */}
        <div style={styles.header}>
          <div style={styles.avatarWrapper}>
            <img
              src={
                user.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name || "User")
              }
              alt="Avatar"
              style={styles.avatar}
            />

            <label style={styles.uploadBtn}>
              {photoLoading ? "Subiendo..." : "Cambiar foto"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoUpload}
              />
            </label>
          </div>

          <div>
            <h2>{user.name || "Usuario"}</h2>
            <p style={styles.muted}>{user.email}</p>
            <span style={styles.role}>
              Rol: {user.role === "owner" ? "Propietario" : "Inquilino"}
            </span>
          </div>
        </div>

        {/* =========================
            SCORE
        ========================= */}
        <div style={styles.section}>
          <h3>Score</h3>
          <p style={styles.score}>
            ⭐ {user.score ?? "No disponible en este momento"}
          </p>
        </div>

        {/* =========================
            RESEÑAS
        ========================= */}
        <div style={styles.section}>
          <h3>Reseñas</h3>

          {user.reviews && user.reviews.length > 0 ? (
            <ul style={styles.reviews}>
              {user.reviews.map((r, i) => (
                <li key={i} style={styles.review}>
                  <strong>{r.author}</strong>
                  <p>{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.muted}>
              Aún no tienes reseñas
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   ESTILOS
========================= */
const styles = {
  page: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    background: "#f9fafb",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #2563eb",
  },
  uploadBtn: {
    marginTop: 8,
    display: "inline-block",
    fontSize: 13,
    color: "#2563eb",
    cursor: "pointer",
  },
  role: {
    display: "inline-block",
    marginTop: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#e0e7ff",
    color: "#1e3a8a",
    fontSize: 13,
    fontWeight: 500,
  },
  section: {
    marginTop: 20,
  },
  score: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 6,
  },
  reviews: {
    listStyle: "none",
    padding: 0,
    marginTop: 10,
  },
  review: {
    padding: 12,
    borderRadius: 8,
    background: "#f3f4f6",
    marginBottom: 10,
  },
  muted: {
    color: "#6b7280",
  },
};
