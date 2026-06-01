# Set the default shell to bash/zsh so cd chaining works nicely
_default:
    @just --list

# Start the FastAPI backend
backend:
    cd backend && uv run fastapi dev

# Install frontend dependencies and start the Vite/React dev server
frontend:
    cd frontend && npm install && npm run dev

# Run both at the same time (requires 'concurrently' installed globally or via npx)
dev:
    npx concurrently "just backend" "just frontend"
