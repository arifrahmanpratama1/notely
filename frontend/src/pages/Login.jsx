import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await loginUser(username, password);
      login(data.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilan ketika user sudah berhasil login
  if (isAuthenticated) {
    return (
      <div style={styles.card}>
        <div style={styles.iconSuccess}>✓</div>
        <h2 style={styles.title}>Berhasil Masuk!</h2>
        <p style={styles.subtitle}>
          Sesi Anda telah aktif. Selamat mengelola tugas Anda.
        </p>
        <button onClick={logout} style={styles.buttonLogout}>
          Keluar dari Akun
        </button>
      </div>
    );
  }

  // Tampilan Form Login Modern (Dark Theme)
  return (
    <div style={styles.card}>
      <div style={styles.headerContainer}>
        <h2 style={styles.title}>Selamat Datang Kembali</h2>
        <p style={styles.subtitle}>
          Silakan masuk menggunakan akun yang sudah terdaftar
        </p>
      </div>

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
            placeholder="Masukkan username Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={isLoading} style={styles.buttonSubmit}>
          {isLoading ? "Memproses..." : "Masuk Aplikasi"}
        </button>
      </form>
    </div>
  );
}

// --- JALUR DESIGN STYLING (Dark Dashboard Theme) ---
const styles = {
  card: {
    backgroundColor: "#1e1e1e", // Menyelaraskan dengan Signup.jsx (#1e1e1e)
    width: "100%",
    maxWidth: "420px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)", // Bayangan dalam (deep shadow) untuk tema gelap
    padding: "40px 32px",
    boxSizing: "border-box",
    textAlign: "center",
    border: "1px solid #2d2d2d", // Border transparan tipis agar elegan
  },
  headerContainer: {
    marginBottom: "32px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff", // Teks Putih Bersih
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#a0aec0", // Abu-abu lembut (soft gray)
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    textAlign: "left",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#cbd5e0", // Teks label terang
  },
  input: {
    padding: "12px 16px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #3a3a3a",
    backgroundColor: "#2d2d2d", // Input field gelap kontras
    color: "#ffffff", // Teks input putih
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
  },
  buttonSubmit: {
    marginTop: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#4f46e5", // Mempertahankan Indigo Premium Anda
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  errorBadge: {
    backgroundColor: "#2d1a1a", // Merah gelap transparan agar tidak silau
    color: "#fc8181",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    textAlign: "left",
    marginBottom: "20px",
    border: "1px solid #4a2020",
    lineHeight: "1.4",
  },
  iconSuccess: {
    width: "56px",
    height: "56px",
    backgroundColor: "#1a2e26", // Hijau gelap transparan
    color: "#68d391",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    margin: "0 auto 20px auto",
    fontWeight: "bold",
  },
  buttonLogout: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#cbd5e0",
    backgroundColor: "#2d2d2d",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "16px",
    transition: "background-color 0.2s ease",
  },
};
