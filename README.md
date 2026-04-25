## Tech Stack

### Backend
* **FastAPI**: Modern, high-performance web framework for building APIs with Python.
* **uv**: An extremely fast Python package and project manager.
* **Uvicorn**: Lightning-fast ASGI server implementation.

### Frontend
* **React**: A JavaScript library for building user interfaces.
* **Vite**: Next-generation frontend tooling for a fast development experience.
* **NPM**: Package management and scripts.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/banteng-hitam/whatever.git
cd whatever
```

### 2. Backend Setup
The backend uses `uv` for dependency management. Ensure you have `uv` installed on your system.

```bash
# Navigate to the backend directory
cd backend

# Run the development server
uv run fastapi dev app/main.py
```

The API will be available at: http://127.0.0.1:8000

### 3. Frontend Setup

The frontend is a Vite-powered React application.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at: http://localhost:5173
