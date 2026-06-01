import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardTodo from "./DashboardTodo";

export default function Home() {
  const { isAuthenticated } = useAuth();

  // --- JIKA SUDAH LOGIN: Langsung panggil Dashboard ---
  if (isAuthenticated) {
    return <DashboardTodo />;
  }

  // --- TAMPILAN LANDING PAGE (BELUM LOGIN) ---
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
