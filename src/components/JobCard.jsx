import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const isSaved = savedJobs.some(
      (item) => String(item.id) === String(job.id)
    );

    setSaved(isSaved);
  }, [job.id]);

  function handleSave() {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (saved) {
      const updatedJobs = savedJobs.filter(
        (item) => String(item.id) !== String(job.id)
      );

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setSaved(false);

      window.dispatchEvent(new Event("savedJobsUpdated"));

      return;
    }

    const updatedJobs = [...savedJobs, job];

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    setSaved(true);

    window.dispatchEvent(new Event("savedJobsUpdated"));
  }

  return (
    <article className="job-card">

      <div className="job-card-top">

        <div className="company-logo">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
            />
          ) : (
            <i className="bi bi-building"></i>
          )}
        </div>

        <button
          className={`save-job-btn ${saved ? "saved" : ""}`}
          onClick={handleSave}
        >
          <i
            className={
              saved
                ? "bi bi-bookmark-check-fill"
                : "bi bi-bookmark"
            }
          ></i>

          {saved ? "Saved" : "Save"}
        </button>

      </div>

      <div className="job-card-content">

        <span className="job-category">
          {job.category || "General"}
        </span>

        <h3>{job.title}</h3>

        <p className="company-name">
          <i className="bi bi-building"></i>
          {job.company_name}
        </p>

        <div className="job-meta">

          <span>
            <i className="bi bi-geo-alt"></i>
            {job.candidate_required_location || "Remote"}
          </span>

          <span>
            <i className="bi bi-clock"></i>
            {job.job_type || "Full-time"}
          </span>

        </div>

      </div>

      <div className="job-card-bottom">

        <span className="remote-badge">
          <i className="bi bi-globe2"></i>
          Remote
        </span>

        <Link
          to={`/jobs/${job.id}`}
          className="view-job-btn"
        >
          View Job
          <i className="bi bi-arrow-up-right"></i>
        </Link>

      </div>

    </article>
  );
}

export default JobCard;