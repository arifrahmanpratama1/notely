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

    // Check if FastAPI returned an array of validation errors
    let errorMessage = "Gagal melakukan registrasi";
    if (Array.isArray(errorData.detail)) {
      // Map through errors and combine their readable 'msg' fields
      errorMessage = errorData.detail
        .map((err) => `${err.loc[1]} should have at least 8 characters`)
        .join(", ");
    } else if (typeof errorData.detail === "string") {
      errorMessage = errorData.detail;
    }

    throw new Error(errorMessage);
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

    let errorMessage = "Username atau password salah";
    if (Array.isArray(errorData.detail)) {
      errorMessage = errorData.detail.map((err) => err.msg).join(", ");
    } else if (typeof errorData.detail === "string") {
      errorMessage = errorData.detail;
    }

    throw new Error(errorMessage);
  }
  return response.json();
};
