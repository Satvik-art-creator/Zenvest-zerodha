import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.number}>404</div>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.desc}>
          This page doesn't exist in the dashboard. Check the URL or go back to your dashboard.
        </p>
        <div style={styles.actions}>
          <Link to="/" style={styles.btnPrimary}>
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    textAlign: "center",
    maxWidth: "440px",
    width: "100%",
  },
  number: {
    fontSize: "5rem",
    fontWeight: "800",
    lineHeight: 1,
    color: "#e74c3c",
    marginBottom: "0.25rem",
    letterSpacing: "-2px",
  },
  title: {
    fontSize: "1.35rem",
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: "0.5rem",
  },
  desc: {
    fontSize: "0.92rem",
    color: "#6c757d",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 28px",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "0.95rem",
    textDecoration: "none",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    transition: "all 0.2s ease",
  },
};
