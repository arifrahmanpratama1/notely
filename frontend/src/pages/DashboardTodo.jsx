import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Ambil token global dari sini
import {
  fetchTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../api/todo";

export default function DashboardTodo() {
  const { token, logout } = useAuth(); // Dapatkan token akses JWT
  const [todos, setTodos] = useState([]); // Mulai dengan array kosong (menunggu database)
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- 1. Ambil Data dari SQLite Pertama Kali ---
  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTodosApi(token);
        setTodos(data);
      } catch (err) {
        setError(err.message);
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
      setTodos([newTodoFromServer, ...todos]); // Masukkan data asli dari backend ke state UI
      setNewTodoTitle("");
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

  const completedCount = todos.filter((t) => t.is_completed).length;
  const progressPercentage =
    todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  // --- CARA MENDAPATKAN NAMA USER DARI JWT TOKEN ---
  const dapatkanNamaDariToken = () => {
    if (!token) return "User";
    try {
      const base64Url = token.split(".")[1]; // ambil payload token
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      const parsed = JSON.parse(jsonPayload);
      return parsed.sub || "User"; // 'sub' adalah field username tempat kita menyimpan data di BE FastAPI
    } catch (e) {
      return "User";
    }
  };

  const namaUser = dapatkanNamaDariToken();

  return (
    <div className="dashboard-container">
      {/* Header Dashboard */}
      <div className="dashboard-header">
        <h1 className="dashboard-welcome">
          Selamat Datang, <span className="dashboard-username">{namaUser}</span>
          !
        </h1>
      </div>

      {error && <div className="error-badge">{error}</div>}

      {/* Form Input Box */}
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          placeholder="Agenda hari ini?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="todo-input"
        />
        <button type="submit" className="todo-submit-btn">
          Commit
        </button>
      </form>

      {/* Kotak Card Utama Pembungkus To-Do List */}
      <div className="todo-card">
        {/* Panel Statistik Progres */}
        <div className="progress-panel">
          <div className="progress-header">
            <span className="progress-title">PROGRESS TRACKER</span>
            <span className="progress-badge">
              {completedCount} of {todos.length} Done
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Item List Area */}
        {isLoading ? (
          <div className="todo-status-msg">Mengambil data dari server...</div>
        ) : todos.length === 0 ? (
          <div className="todo-status-msg">
            <p>Semua tugas selesai dikerjakan.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.is_completed ? "completed" : ""}`}
              >
                <div className="todo-item-left">
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() =>
                      handleToggleComplete(todo.id, todo.is_completed)
                    }
                    className="todo-checkbox"
                  />
                  <span className="todo-title-text">{todo.title}</span>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="todo-delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Moved Log Out Action Below Card Workspace */}
      <div className="dashboard-footer-actions">
        <button onClick={logout} className="btn-logout">
          Log Out Account
        </button>
      </div>
    </div>
  );
}
