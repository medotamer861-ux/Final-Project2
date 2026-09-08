import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getJobs } from "../services/jobApi";
import JobSkeleton from "../components/JobSkeleton";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJob();
  }, [id]);

  async function loadJob() {
    try {
      setLoading(true);
      setError("");

      const jobs = await getJobs();

      const foundJob = jobs.find(
        (item) => String(item.id) === String(id)
      );

      if (!foundJob) {
        throw new Error("Job not found");
      }

      setJob(foundJob);
    } catch (err) {
      setError("We couldn't load this job.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="details-loading">
            <JobSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="job-details-page">
        <div className="container">
          <div className="state-card">
            <div className="state-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <h3>Job Not Found</h3>

            <p>
              This job may have been removed or is no longer
              available.
            </p>

            <Link to="/jobs" className="retry-btn">
              <i className="bi bi-arrow-left"></i>
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">

      <div className="container">

        {/* BACK */}

        <Link to="/jobs" className="details-back">
          <i className="bi bi-arrow-left"></i>
          Back to Jobs
        </Link>


        <div className="row g-4">

          {/* MAIN CONTENT */}

          <div className="col-lg-8">

            <div className="job-details-main">

              {/* JOB HEADER */}

              <div className="job-details-header">

                <div className="details-company-logo">

                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                    />
                  ) : (
                    <i className="bi bi-building"></i>
                  )}

                </div>

                <div>

                  <span className="job-category">
                    {job.category || "General"}
                  </span>

                  <h1>{job.title}</h1>

                  <p>
                    <i className="bi bi-building"></i>
                    {job.company_name}
                  </p>

                </div>

              </div>


              {/* META */}

              <div className="details-meta">

                <div>
                  <i className="bi bi-geo-alt"></i>

                  <span>
                    <small>Location</small>
                    {job.candidate_required_location ||
                      "Remote"}
                  </span>
                </div>

                <div>
                  <i className="bi bi-clock"></i>

                  <span>
                    <small>Job Type</small>
                    {job.job_type || "Full-time"}
                  </span>
                </div>

                <div>
                  <i className="bi bi-calendar3"></i>

                  <span>
                    <small>Posted</small>
                    {job.publication_date
                      ? new Date(
                          job.publication_date
                        ).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="details-section">

                <h2>
                  <i className="bi bi-file-text"></i>
                  Job Description
                </h2>

                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      job.description ||
                      "<p>No description available.</p>",
                  }}
                />

              </div>


              {/* COMPANY */}

              <div className="details-section">

                <h2>
                  <i className="bi bi-buildings"></i>
                  About the Company
                </h2>

                <p>
                  {job.company_name} is looking for talented
                  people to join their team. Explore this
                  opportunity and see if this role matches
                  your skills and career goals.
                </p>

              </div>

            </div>

          </div>


          {/* SIDEBAR */}

          <div className="col-lg-4">

            <aside className="job-details-sidebar">

              <div className="apply-box">

                <span>
                  INTERESTED IN THIS ROLE?
                </span>

                <h2>
                  Ready to apply?
                </h2>

                <p>
                  Take the next step in your career and
                  submit your application.
                </p>

                <Link
                  to={`/jobs/${job.id}/apply`}
                  className="apply-now-btn"
                >
                  Apply Now
                  <i className="bi bi-arrow-right"></i>
                </Link>

              </div>


              <div className="quick-info">

                <h3>
                  Job Information
                </h3>

                <div className="quick-info-item">

                  <i className="bi bi-briefcase"></i>

                  <div>
                    <small>Category</small>
                    <strong>
                      {job.category || "General"}
                    </strong>
                  </div>

                </div>

                <div className="quick-info-item">

                  <i className="bi bi-geo-alt"></i>

                  <div>
                    <small>Location</small>
                    <strong>
                      {job.candidate_required_location ||
                        "Remote"}
                    </strong>
                  </div>

                </div>

                <div className="quick-info-item">

                  <i className="bi bi-building"></i>

                  <div>
                    <small>Company</small>
                    <strong>
                      {job.company_name}
                    </strong>
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;