import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">

        <div className="state-card">

          <div className="state-icon">
            <i className="bi bi-compass"></i>
          </div>

          <span className="section-label">
            ERROR 404
          </span>

          <h1>
            Page Not Found
          </h1>

          <p>
            The page you're looking for doesn't exist
            or may have been moved.
          </p>

          <Link
            to="/"
            className="retry-btn"
          >
            <i className="bi bi-house"></i>
            Back Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default NotFound;