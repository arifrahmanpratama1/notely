const BASE_URL = "http://localhost:8000";

// 1. Fungsi Signup (Mengirim JSON)
export const signupUser = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Gagal melakukan registrasi");
  }
  return response.json();
};

// 2. Fungsi Login (Mengirim Form-Data sesuai standar OAuth2 FastAPI)
export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Username atau password salah");
  }
  return response.json(); // Mengembalikan { access_token: "...", token_type: "bearer" }
};
