import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  fetchTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../api/todo";

export default function DashboardTodo() {
  const { token, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fitur Baru: State untuk memfilter daftar to-do ('all', 'active', 'completed')
  const [filter, setFilter] = useState("all");

  // --- 1. Ambil Data dari SQLite Pertama Kali ---
  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTodosApi(token);
        setTodos(data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data tugas.");
      } finally {
        setIsLoading(false);
      }
    };
    if (token) loadTodos();
  }, [token]);

  // --- 2. Logika Menambah Data ke Database (CRUD - Create) ---
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodoFromServer = await createTodoApi(token, newTodoTitle);
      setTodos([newTodoFromServer, ...todos]);
      setNewTodoTitle("");
      setError(""); // Reset error jika berhasil
    } catch (err) {
      setError("Gagal menyimpan tugas baru ke server.");
    }
  };

  // --- 3. Logika Update Data di Database (CRUD - Update) ---
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const updatedTodo = await updateTodoApi(token, id, !currentStatus);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError("Gagal merubah status tugas.");
    }
  };

  // --- 4. Logika Hapus Data dari Database (CRUD - Delete) ---
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodoApi(token, id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Gagal menghapus tugas dari server.");
    }
  };

  // --- 5. Perhitungan Statistik (Kini Lebih Kaya) ---
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.is_completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // --- 6. Memfilter Data Sesuai Tab Aktif ---
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  // --- 7. Optimasi Penguraian Token Menggunakan useMemo ---
  const namaUser = useMemo(() => {
    if (!token) return "User";
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      const parsed = JSON.parse(jsonPayload);
      return parsed.sub || "User";
    } catch (e) {
      return "User";
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      {/* Header Dashboard */}
      <div className="dashboard-header">
        <h1 className="dashboard-welcome">
          Selamat Datang, <span className="dashboard-username">{namaUser}</span>
          !
        </h1>
        <p className="dashboard-subtitle">
          Kelola tugas harianmu dengan lebih terstruktur.
        </p>
      </div>

      {error && <div className="error-badge">{error}</div>}

      {/* BARU: Row untuk Ringkasan Statistik (Mengisi area yang sparse) */}
      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-label">Total Tugas</span>
          <span className="stats-value">{totalCount}</span>
        </div>
        <div className="stats-card active-tasks">
          <span className="stats-label">Sedang Berjalan</span>
          <span className="stats-value">{activeCount}</span>
        </div>
        <div className="stats-card completed-tasks">
          <span className="stats-label">Selesai</span>
          <span className="stats-value">{completedCount}</span>
        </div>
      </div>

      {/* Form Input Box */}
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          placeholder="Ada agenda baru apa hari ini?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-submit-btn">
          Tambah
        </button>
      </form>

      {/* Kotak Card Utama Pembungkus To-Do List */}
      <div className="todo-card">
        {/* Panel Statistik Progres */}
        <div className="progress-panel">
          <div className="progress-header">
            <span className="progress-title">PROGRESS TRACKER</span>
            <span className="progress-badge">
              {progressPercentage}% Selesai
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* BARU: Tab Filter Kontrol */}
        <div className="todo-filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Semua ({totalCount})
          </button>
          <button
            className={`filter-tab ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Aktif ({activeCount})
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Selesai ({completedCount})
          </button>
        </div>

        {/* Item List Area */}
        {isLoading ? (
          <div className="todo-status-msg">Mengambil data dari server...</div>
        ) : filteredTodos.length === 0 ? (
          <div className="todo-status-msg empty-state">
            {filter === "all" && (
              <p>Belum ada tugas dibuat. Yuk, mulai produktif hari ini!</p>
            )}
            {filter === "active" && (
              <p>Semua tugas sudah diselesaikan. Kerja bagus!</p>
            )}
            {filter === "completed" && (
              <p>Belum ada tugas yang diselesaikan. Tetap semangat!</p>
            )}
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.is_completed ? "completed" : ""}`}
              >
                <div className="todo-item-left">
                  <label className="todo-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={todo.is_completed}
                      onChange={() =>
                        handleToggleComplete(todo.id, todo.is_completed)
                      }
                      className="todo-checkbox"
                    />
                    <span className="todo-title-text">{todo.title}</span>
                  </label>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="todo-delete-btn"
                  aria-label="Hapus tugas"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Actions */}
      <div className="dashboard-footer-actions">
        <button onClick={logout} className="btn-logout">
          Keluar Akun
        </button>
      </div>
    </div>
  );
}
