import { createContext, useState, useContext } from "react";

// 1. Buat context internal (tidak di-export agar Fast Refresh bekerja sempurna)
const AuthContext = createContext(null);

// 2. Provider Utama
export const AuthProvider = ({ children }) => {
  // Menggunakan fungsi inisialisasi agar pembacaan localStorage hanya berjalan 1 kali (efisien)
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || null;
    } catch {
      return null;
    }
  });

  const login = (newToken) => {
    try {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Gagal menyimpan token ke localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
    } catch (error) {
      console.error("Gagal menghapus token dari localStorage:", error);
    }
  };

  // State turunan yang reaktif dan aman dari bug tipe data
  const isAuthenticated =
    token !== null && token !== undefined && token !== "null";

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook yang bersih untuk di-consume komponen anak
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth harus digunakan di dalam lingkup komponen AuthProvider"
    );
  }
  return context;
};
