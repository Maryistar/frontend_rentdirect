import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications, withdrawApplication } from "../api/applications";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getMyApplications();
        setApplications(data);
        setFiltered(data);
      } catch (err) {
        setError("No se pudieron cargar tus aplicaciones");
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  /* =====================
     FILTRO POR ESTADO
  ===================== */
  useEffect(() => {
    if (filter === "all") {
      setFiltered(applications);
    } else {
      setFiltered(applications.filter(a => a.status === filter));
    }
  }, [filter, applications]);

  async function handleWithdraw(e, applicationId) {
    e.stopPropagation();
    if (!confirm("¿Seguro que deseas retirar esta aplicación?")) return;

    try {
      await withdrawApplication(applicationId);
      setApplications(prev =>
        prev.filter(app => app.id !== applicationId)
      );
    } catch (err) {
      alert("Error al retirar la aplicación");
    }
  }

  if (loading) return <p style={styles.center}>Cargando aplicaciones...</p>;
  if (error) return <p style={styles.center}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mis aplicaciones</h1>

      {/* FILTROS */}
      <div style={styles.filters}>
        {["Todas", "Pendiente", "Aprovada", "Rechazada"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              background: filter === f ? "#2563eb" : "#e5e7eb",
              color: filter === f ? "#fff" : "#000",
            }}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={styles.empty}>No hay aplicaciones para este estado</p>
      )}

      <div style={styles.list}>
        {filtered.map(app => (
          <div
            key={app.id}
            style={styles.card}
            onClick={() => navigate(`/properties/${app.property_id}`)}
            onMouseEnter={e =>
              (e.currentTarget.style.transform = "translateY(-3px)")
            }
            onMouseLeave={e =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* HEADER */}
            <div style={styles.header}>
              <h3>{app.property_title}</h3>
              <span
                style={{
                  ...styles.status,
                  backgroundColor:
                    app.status === "approved"
                      ? "#d1fae5"
                      : app.status === "rejected"
                      ? "#fee2e2"
                      : "#fef3c7",
                  color:
                    app.status === "approved"
                      ? "#065f46"
                      : app.status === "rejected"
                      ? "#991b1b"
                      : "#92400e",
                }}
              >
                {app.status.toUpperCase()}
              </span>
            </div>

            {/* BODY */}
            <div style={styles.body}>
              {app.message && (
                <p><strong>Mensaje:</strong> {app.message}</p>
              )}

              <p style={styles.date}>
                Aplicado el {new Date(app.created_at).toLocaleDateString()}
              </p>

              <div style={styles.actions}>
                <span style={styles.view}>
                  Ver propiedad →
                </span>

                {app.status === "pending" && (
                  <button
                    style={styles.withdraw}
                    onClick={(e) => handleWithdraw(e, app.id)}
                  >
                    Retirar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =====================
   ESTILOS
===================== */

const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: "0 20px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  center: {
    textAlign: "center",
    marginTop: "40px",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16,
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  status: {
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
  },
  body: {
    padding: 16,
  },
  date: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  view: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  withdraw: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
