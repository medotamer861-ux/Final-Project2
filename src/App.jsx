import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("jobs-theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    localStorage.setItem("jobs-theme", theme);

    document.body.classList.remove(
      "light-mode",
      "dark-mode"
    );

    document.body.classList.add(`${theme}-mode`);
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <BrowserRouter>

      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <main
        className={
          darkMode
            ? "app dark-theme"
            : "app light-theme"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/jobs/:id"
            element={<JobDetails />}
          />

          <Route
            path="/jobs/:id/apply"
            element={<Apply />}
          />

          <Route
            path="/saved-jobs"
            element={<SavedJobs />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

    </BrowserRouter>
  );
}

export default App;