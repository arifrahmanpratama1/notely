import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="header-container">
          <h2 className="auth-title">Selamat Datang Kembali</h2>
          <p className="auth-subtitle">
            Silakan masuk menggunakan akun yang sudah terdaftar
          </p>
        </div>

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
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-submit btn-indigo"
          >
            {isLoading ? "Memproses..." : "Masuk Aplikasi"}
          </button>
        </form>

        <div className="navigation-footer">
          Belum punya akun?{" "}
          <Link to="/signup" className="footer-link-indigo">
            Daftar di sini
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