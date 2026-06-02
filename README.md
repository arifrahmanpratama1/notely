# Notely

This repository contains the project submission for RPL - Final Semester Exam.

## Group Members
* Haiqal A. ([@Haiqal](https://github.com/Isvane))
* Dafa A. ([@Dafa](https://github.com/Dafa-Web-progaming))
* Maulana R. ([@Maulana](https://github.com/MaulanaRizky6))
* Arif R. ([@Arif](https://github.com/arifrahmanpratama1))
* Zahrah F. ([@Zahrah](https://github.com/moezaazzara))

---

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
git clone https://github.com/Isvane/notely.git
cd notely
```

### 1-B. Using Just
```bash
# Start the FastAPI backend
just backend

# Install frontend dependencies and start the Vite/React dev server
just frontend

# Run both at the same time (requires 'concurrently' installed globally or via npx)
just dev
```

### 2. Backend Setup
The backend uses `uv` for dependency management. Ensure you have `uv` installed on your system.

```bash
# Navigate to the backend directory
cd backend

# Run the development server
uv run fastapi dev
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

---

## Git Workflow (Read This!)

To avoid merge conflicts and protect the main codebase, please follow this workflow below every time you work.

1. Switch to the main branch and pull the latest changes.
    ```bash
    git checkout main
    git pull origin main
    ```

2.  Create and switch to a new branch for your specific task (use a descriptive name like `feat/login-page` or `fix/button-bug`).
    ```bash
    git checkout -b your-branch-name
    ```

3.  Make your changes.

4. Once your changes are ready, stage them, commit them, and push your feature branch to the remote repository.
    ```bash
    git add .
    git commit -m "feat: description of changes"
    git push origin your-branch-name
    ```

5. Go to GitHub and open a **Pull Request (PR)** from `your-branch-name` into `main`.
