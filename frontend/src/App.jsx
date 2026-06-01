import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <div
        style={{
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          padding: "40px",
          backgroundColor: "#121212", // Warna latar belakang obsidian
          minHeight: "100vh",
          color: "#E0E0E0", // Warna teks terang
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "300",
            letterSpacing: "1px",
            marginBottom: "60px",
            color: "#FFFFFF", // Teks judul putih bersih
          }}
        >
          Aplikasi To-Do List (Auth System)
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px", // Jarak antar panel yang lega
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "1200px", // Membatasi lebar agar tetap rapi
          }}
        >
          {/* Anda mungkin perlu menyesuaikan styling di dalam komponen 
              Signup dan Login agar serasi dengan tema gelap ini. */}
          <Signup />
          <Login />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
