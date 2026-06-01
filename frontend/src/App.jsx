import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Endpoint Halaman Utama */}
          <Route path="/" element={<Home />} />

          {/* Endpoint Login */}
          <Route path="/login" element={<Login />} />

          {/* Endpoint Signup */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;