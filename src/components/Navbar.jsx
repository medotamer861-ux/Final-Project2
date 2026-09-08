import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar({ darkMode, toggleTheme }) {
  const [savedCount, setSavedCount] = useState(0);

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("hireflow-user") ? true : false;
  });

  function updateSavedCount() {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedCount(savedJobs.length);
  }

  useEffect(() => {
    updateSavedCount();

    window.addEventListener(
      "savedJobsUpdated",
      updateSavedCount
    );

    return () => {
      window.removeEventListener(
        "savedJobsUpdated",
        updateSavedCount
      );
    };
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("hireflow-user");

    if (savedUser) {
      setUsername(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    if (!username.trim() || !email.trim()) {
      return;
    }

    localStorage.setItem(
      "hireflow-user",
      username.trim()
    );

    setIsLoggedIn(true);
    setShowLogin(false);
    setEmail("");
  }

  function handleLogout() {
    localStorage.removeItem("hireflow-user");

    setUsername("");
    setEmail("");
    setIsLoggedIn(false);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">

          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <span className="brand-icon">
              <i className="bi bi-briefcase-fill"></i>
            </span>

            <span>
              Hire<span>Flow</span>
            </span>
          </NavLink>

          {/* Mobile Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="mainNavbar"
          >

            {/* Navigation */}
            <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Find Jobs
                </NavLink>
              </li>

            </ul>

            {/* Actions */}
            <div className="navbar-actions">

              {/* Saved Jobs */}
              <NavLink
                to="/saved-jobs"
                className={({ isActive }) =>
                  `saved-nav-btn ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <span className="saved-icon">
                  <i className="bi bi-bookmark-fill"></i>
                </span>

                <span className="saved-text">
                  Saved
                </span>

                {savedCount > 0 && (
                  <span className="saved-count">
                    {savedCount > 99
                      ? "99+"
                      : savedCount}
                  </span>
                )}
              </NavLink>

              {/* Theme */}
              <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                title={
                  darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <i
                  className={
                    darkMode
                      ? "bi bi-sun-fill"
                      : "bi bi-moon-stars-fill"
                  }
                ></i>
              </button>

              {/* Login / User */}
              {!isLoggedIn ? (
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => setShowLogin(true)}
                >
                  <i className="bi bi-person"></i>
                  Sign In
                </button>
              ) : (
                <div className="user-menu">
                  <div className="user-info">
                    <span className="user-avatar">
                      {username.charAt(0).toUpperCase()}
                    </span>

                    <span className="user-name">
                      {username}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </div>
              )}

              {/* Find Job */}
              <NavLink
                to="/jobs"
                className="post-job-btn"
              >
                Find a Job
                <i className="bi bi-arrow-up-right"></i>
              </NavLink>

            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div
          className="login-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="login-close"
              onClick={() => setShowLogin(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="login-icon">
              <i className="bi bi-person-fill"></i>
            </div>

            <span className="login-label">
              WELCOME BACK
            </span>

            <h2>
              Sign in to <span>HireFlow</span>
            </h2>

            <p>
              Access your saved jobs and continue your
              career journey.
            </p>

            <form onSubmit={handleLogin}>

              <div className="login-input">
                <i className="bi bi-person"></i>

                <input
                  type="text"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />
              </div>

              <div className="login-input">
                <i className="bi bi-envelope"></i>

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="login-submit"
              >
                Sign In
                <i className="bi bi-arrow-right"></i>
              </button>

            </form>

            <div className="login-footer">
              <i className="bi bi-shield-check"></i>
              Your information stays on this device.
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;