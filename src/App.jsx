import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import SavedJobs from "./pages/SavedJobs";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  // Load saved theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("hireflow-theme") === "dark";
  });

  // Apply theme
  useEffect(() => {
    if (darkMode) {
       document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      localStorage.setItem("hireflow-theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
       document.body.classList.add("light-mode");
      localStorage.setItem("hireflow-theme", "light");
    }
  }, [darkMode]);

  // Toggle theme
  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  return (
    <HashRouter>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

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
    </HashRouter>
  );
}

export default App;

