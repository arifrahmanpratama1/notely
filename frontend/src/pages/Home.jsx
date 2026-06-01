import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

export default function Home() {
  const { isAuthenticated, logout } = useAuth(); // Ambil status auth dan fungsi logout

  // --- Tampilan jika sudah LOGIN (Dashboard To-Do) ---
  if (isAuthenticated) {
    return (
      <div className="home-container">
        <h1 className="home-title">Dashboard Tugas</h1>
        <p className="home-subtitle">
          Selamat datang kembali! Apa yang ingin Anda kerjakan hari ini?
        </p>

        {/* Placeholder untuk To-Do List Anda nanti */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px dashed #444",
            borderRadius: "10px",
          }}
        >
          <p>Daftar tugas akan muncul di sini...</p>
        </div>

        <div className="button-row" style={{ marginTop: "30px" }}>
          <button onClick={logout} className="btn btn-red">
            Log Out
          </button>
        </div>
      </div>
    );
  }

  // --- Tampilan jika BELUM login (Landing Page) ---
  return (
    <div className="home-container">
      <h1 className="home-title">TO-DO LIST SYSTEM</h1>
      <p className="home-subtitle">
        Kelola tugas Anda dengan arsitektur Separation of Concerns.
      </p>

      <div className="button-row">
        <Link to="/login" className="btn btn-green">
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-transparent">
          Create Account
        </Link>
      </div>
    </div>
  );
}
