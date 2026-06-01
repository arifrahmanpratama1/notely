import { useState } from "react";
import { Link } from "react-router-dom";
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
      setFormData({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="header-container">
          <h2 className="auth-title">Daftar Akun Baru</h2>
          <p className="auth-subtitle">
            Mulai kelola tugas harian Anda secara terorganisir
          </p>
        </div>

        {message && <div className="success-badge">{message}</div>}
        {error && (
          <div className="error-badge">
            <span style={{ fontWeight: "bold" }}>Gagal:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Pilih nama pengguna"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-submit btn-teal"
          >
            {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </button>
        </form>

        <div className="navigation-footer">
          Sudah memiliki akun?{" "}
          <Link to="/login" className="footer-link-teal">
            Silakan Login
          </Link>
          <br />
          <Link to="/" className="back-link">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}