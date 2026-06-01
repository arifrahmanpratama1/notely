import { useState } from "react";
import { Link } from "react-router-dom"; // Tambahkan ini untuk navigasi antar halaman FE
import { signupUser } from "../api/auth";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await signupUser(formData.username, formData.email, formData.password);
      setMessage("Registrasi berhasil! Silakan ke halaman Login.");
      setFormData({ username: "", email: "", password: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          <h2 style={styles.title}>Daftar Akun Baru</h2>
          <p style={styles.subtitle}>
            Mulai kelola tugas harian Anda secara terorganisir
          </p>
        </div>

        {message && <div style={styles.successBadge}>{message}</div>}
        {error && (
          <div style={styles.errorBadge}>
            <span style={{ fontWeight: "bold" }}>Gagal:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Pilih nama pengguna"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={styles.buttonSubmit}
          >
            {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        {/* JALUR NAVIGASI TAMBAHAN */}
        <div style={styles.navigationFooter}>
          Sudah memiliki akun?{" "}
          <Link to="/login" style={styles.loginLink}>
            Silakan Login
          </Link>
          <br />
          <Link to="/" style={styles.backLink}>
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- JALUR DESIGN STYLING (Dark Premium Theme dengan Layout Wrapper) ---
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212", // Menyelaraskan dengan background utama App.jsx
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#1e1e1e", // Hitam abu premium
    width: "100%",
    maxWidth: "420px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    padding: "40px 32px",
    boxSizing: "border-box",
    border: "1px solid #2d2d2d",
  },
  headerContainer: {
    marginBottom: "32px",
    textAlign: "center",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#a0aec0",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e0",
  },
  input: {
    padding: "12px 16px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #3a3a3a",
    backgroundColor: "#2d2d2d",
    color: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
    transition: "all 0.2s ease",
  },
  buttonSubmit: {
    marginTop: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: "#319795", // Teal gelap
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  errorBadge: {
    backgroundColor: "#2d1a1a",
    color: "#fc8181",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    border: "1px solid #4a2020",
    lineHeight: "1.4",
  },
  successBadge: {
    backgroundColor: "#1a2e26",
    color: "#68d391",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px solid #204a37",
    lineHeight: "1.4",
  },
  navigationFooter: {
    marginTop: "24px",
    fontSize: "14px",
    color: "#a0aec0",
    textAlign: "center",
    lineHeight: "1.8",
  },
  loginLink: {
    color: "#319795",
    textDecoration: "none",
    fontWeight: "600",
  },
  backLink: {
    display: "inline-block",
    marginTop: "12px",
    color: "#718096",
    textDecoration: "none",
    fontSize: "13px",
  },
};