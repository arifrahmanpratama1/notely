import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
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

  const isAuthenticated =
    token !== null && token !== undefined && token !== "null";

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth harus digunakan di dalam lingkup komponen AuthProvider",
    );
  }
  return context;
};
