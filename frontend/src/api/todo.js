const BASE_URL = "http://localhost:8000";

// Helper untuk membuat Header Authorization secara otomatis
const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

// 1. Ambil semua tugas milik user yang sedang login
export const fetchTodosApi = async (token) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) throw new Error("Gagal mengambil daftar tugas");
  return response.json();
};

// 2. Tambah tugas baru ke database
export const createTodoApi = async (token, title) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ title, is_completed: false }), // sesuaikan dengan schema TaskCreate di BE Anda
  });
  if (!response.ok) throw new Error("Gagal menambahkan tugas baru");
  return response.json();
};

// 3. Update status complete / title tugas di database
export const updateTodoApi = async (token, id, isCompleted) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ is_completed: isCompleted }), // sesuaikan dengan schema TaskUpdate di BE Anda
  });
  if (!response.ok) throw new Error("Gagal memperbarui status tugas");
  return response.json();
};

// 4. Hapus tugas dari database SQLite
export const deleteTodoApi = async (token, id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) throw new Error("Gagal menghapus tugas");
  return true;
};
