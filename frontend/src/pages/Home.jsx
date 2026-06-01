import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#E0E0E0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontWeight: "300",
          letterSpacing: "2px",
          marginBottom: "10px",
        }}
      >
        TO-DO LIST SYSTEM
      </h1>
      <p style={{ color: "#888", marginBottom: "40px" }}>
        Kelola tugas Anda dengan arsitektur Separation of Concerns.
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/login" style={buttonStyle("#28a745")}>
          Sign In
        </Link>
        <Link to="/signup" style={buttonStyle("transparent", "1px solid #555")}>
          Create Account
        </Link>
      </div>
    </div>
  );
}

// Helper styling untuk tombol
const buttonStyle = (bgColor, border = "none") => ({
  padding: "12px 30px",
  backgroundColor: bgColor,
  border: border,
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  fontSize: "16px",
  transition: "0.3s",
  textAlign: "center",
  minWidth: "150px",
});