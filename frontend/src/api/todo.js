const BASE_URL = "http://localhost:8000";

const getAuthHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const fetchTodosApi = async (token) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) throw new Error("Gagal mengambil daftar tugas");
  return response.json();
};

export const createTodoApi = async (token, title) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ title, is_completed: false }),
  });
  if (!response.ok) throw new Error("Gagal menambahkan tugas baru");
  return response.json();
};

export const updateTodoApi = async (token, id, isCompleted) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ is_completed: isCompleted }),
  });
  if (!response.ok) throw new Error("Gagal memperbarui status tugas");
  return response.json();
};

export const deleteTodoApi = async (token, id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });
  if (!response.ok) throw new Error("Gagal menghapus tugas");
  return true;
};
