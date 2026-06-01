import { Link } from "react-router-dom";

export default function Home() {
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