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
  // Karena JWT Token menyimpan informasi username di dalam payload-nya (bagian tengah hash),
  // kita bisa membongkarnya tanpa perlu hit API profile tambahan!
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
    <div
      className="dashboard-container"
      style={{
        padding: "60px 24px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#2d3748",
      }}
    >
      {/* Header Dashboard */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#a0aec0",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            / Workspace
          </span>
          <h1
            style={{
              fontSize: "1.85rem",
              fontWeight: "800",
              marginTop: "4px",
              margin: 0,
              color: "#1a202c",
            }}
          >
            Selamat Datang,{" "}
            <span style={{ color: "#3182ce", textTransform: "capitalize" }}>
              {namaUser}
            </span>
            !
          </h1>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "0.8rem",
            backgroundColor: "#fff0f0",
            color: "#e53e3e",
            border: "1px solid #fed7d7",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fff5f5",
            color: "#c53030",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            border: "1px solid #fed7d7",
          }}
        >
          {error}
        </div>
      )}

      {/* Form Input Box */}
      <form
        onSubmit={handleAddTodo}
        style={{
          display: "flex",
          gap: "12px",
          backgroundColor: "#ffffff",
          padding: "8px 8px 8px 16px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="Ada agenda apa hari ini?"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            backgroundColor: "transparent",
            color: "#2d3748",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "700",
            fontSize: "0.85rem",
            cursor: "pointer",
            background: "#1a202c",
            color: "#ffffff",
            border: "none",
          }}
        >
          Commit
        </button>
      </form>

      {/* Kotak Card Utama Pembungkus To-Do List */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Panel Statistik Progres */}
        <div
          style={{
            padding: "20px 24px",
            backgroundColor: "#f7fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                color: "#4a5568",
                fontWeight: "700",
                fontSize: "0.8rem",
                letterSpacing: "0.05em",
              }}
            >
              PROGRESS TRACKER
            </span>
            <span
              style={{
                color: "#2b6cb0",
                fontSize: "0.8rem",
                fontWeight: "700",
                backgroundColor: "#ebf8ff",
                padding: "2px 8px",
                borderRadius: "12px",
              }}
            >
              {completedCount} of {todos.length} Done
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#edf2f7",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercentage}%`,
                height: "100%",
                backgroundColor: "#3182ce",
                transition: "width 0.4s ease",
              }}
            ></div>
          </div>
        </div>

        {/* Item List Area */}
        {isLoading ? (
          <div
            style={{ textAlign: "center", padding: "48px", color: "#a0aec0" }}
          >
            Mengambil data dari server...
          </div>
        ) : todos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 24px",
              color: "#a0aec0",
            }}
          >
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              Semua tugas selesai dikerjakan.
            </p>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  border_bottom: "1px solid #edf2f7",
                  backgroundColor: todo.is_completed
                    ? "#f7fafc"
                    : "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() =>
                      handleToggleComplete(todo.id, todo.is_completed)
                    }
                    style={{
                      width: "16px",
                      height: "16px",
                      cursor: "pointer",
                      accentColor: "#3182ce",
                    }}
                  />
                  <span
                    style={{
                      textDecoration: todo.is_completed
                        ? "line-through"
                        : "none",
                      color: todo.is_completed ? "#a0aec0" : "#2d3748",
                      fontSize: "0.95rem",
                      fontWeight: "500",
                    }}
                  >
                    {todo.title}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#e53e3e",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    opacity: 0.6,
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
