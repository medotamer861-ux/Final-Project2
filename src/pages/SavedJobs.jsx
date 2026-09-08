import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import JobCard from "../components/JobCard";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  function loadSavedJobs() {
    const jobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setSavedJobs(jobs);
  }

  useEffect(() => {
    loadSavedJobs();

    window.addEventListener(
      "savedJobsUpdated",
      loadSavedJobs
    );

    return () => {
      window.removeEventListener(
        "savedJobsUpdated",
        loadSavedJobs
      );
    };
  }, []);

  return (
    <div className="jobs-page saved-jobs-page">

      <section className="jobs-header">
        <div className="container">

          <span className="section-label">
            YOUR COLLECTION
          </span>

          <h1>
            Saved <span>Jobs.</span>
          </h1>

          <p>
            Keep track of the opportunities you don't want
            to miss.
          </p>

        </div>
      </section>

      <section className="jobs-content">

        <div className="container">

          <div className="jobs-results-header">

            <div>
              <h2>
                My Saved Jobs
              </h2>

              <span>
                {savedJobs.length}{" "}
                {savedJobs.length === 1 ? "job" : "jobs"} saved
              </span>
            </div>

            <Link
              to="/jobs"
              className="view-job-btn"
            >
              Find More Jobs
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

          {savedJobs.length === 0 ? (

            <div className="state-card">

              <div className="state-icon">
                <i className="bi bi-bookmark"></i>
              </div>

              <h3>
                No saved jobs yet
              </h3>

              <p>
                Save jobs you're interested in and
                they'll appear here.
              </p>

              <Link
                to="/jobs"
                className="retry-btn"
              >
                <i className="bi bi-search"></i>
                Browse Jobs
              </Link>

            </div>

          ) : (

            <div className="row g-4">

              {savedJobs.map((job) => (

                <div
                  className="col-md-6"
                  key={job.id}
                >
                  <JobCard job={job} />
                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default SavedJobs;