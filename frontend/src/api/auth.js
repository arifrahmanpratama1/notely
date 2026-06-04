const BASE_URL = "http://localhost:8000";

export const signupUser = async (username, email, password) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    let errorMessage = "Gagal melakukan registrasi";
    if (Array.isArray(errorData.detail)) {
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
