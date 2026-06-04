import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardTodo from "./DashboardTodo";

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <DashboardTodo />;
  }

  return (
    <div className="home-page-wrapper">
      <div className="floral-decorations" aria-hidden="true">
        <svg
          className="flower flower-top-left"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="12" fill="#fcd7de" />
          <path d="M50 0C55 15 45 25 50 38C45 25 35 15 50 0Z" fill="#ffe4e1" />
          <path
            d="M50 100C45 85 55 75 50 62C55 75 65 85 50 100Z"
            fill="#ffe4e1"
          />
          <path d="M0 50C15 45 25 55 38 50C25 55 15 65 0 50Z" fill="#ffe4e1" />
          <path
            d="M100 50C85 55 75 45 62 50C75 45 85 35 100 50Z"
            fill="#ffe4e1"
          />
        </svg>

        <div className="petal petal-1">🌸</div>
        <div className="petal petal-2">🌸</div>

        <div className="petal petal-3">🌸</div>

        <svg
          className="flower flower-bottom-right"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 90C40 70 60 40 90 10M90 10C70 25 55 45 50 65M90 10C75 5 55 15 35 30"
            stroke="#fcd7de"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="home-container">
        <header className="home-hero">
          <span className="hero-badge">
            ✨ Clear Your Mind, Organize Your Day
          </span>
          <h1 className="home-title">NOTELY</h1>
          <p className="home-subtitle">
            A minimalist workspace designed to capture your thoughts, track your
            progress, and commit to your daily goals without the clutter.
          </p>

          <div className="button-row">
            <Link to="/login" className="btn btn-green">
              Sign In to Workspace
            </Link>
            <Link to="/signup" className="btn btn-transparent">
              Create Free Account
            </Link>
          </div>
        </header>

        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Instant Commits</h3>
            <p>
              Quickly log your agenda items using our ultra-fast input
              dashboard.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Tracker</h3>
            <p>
              Watch your completion rates update live with smooth visual
              analytics.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure SQLite Storage</h3>
            <p>
              Your workspace, completely authenticated and isolated using JWT
              encryption.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Minimalist Canvas</h3>
            <p>
              A soft, distraction-free interface crafted to let your
              productivity take center stage.
            </p>
          </div>
        </section>

        <footer className="home-stats-footer">
          <div className="stat-item">
            <strong>100%</strong>
            <span>Privacy Focused</span>
          </div>
          <div className="divider-line"></div>
          <div className="stat-item">
            <strong>Lite</strong>
            <span>Zero Bloatware</span>
          </div>
          <div className="divider-line"></div>
          <div className="stat-item">
            <strong>Fast</strong>
            <span>FastAPI Powered</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
