import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import JobCard from "../components/JobCard";
import JobSkeleton from "../components/JobSkeleton";

import { getJobs } from "../services/jobApi";

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // =========================
  // STATE
  // =========================

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  // =========================
  // CATEGORY MAPPING
  // =========================
  // أسماء الـ categories الظاهرة في Home
  // والقيم التي يبحث عنها Remotive

  const categoryMapping = {
    Technology: [
      "software development",
      "software",
      "development",
      "engineering",
      "web development",
      "technical",
      "programming",
    ],

    Marketing: [
      "marketing",
      "sales and marketing",
      "sales",
      "growth",
      "content",
      "digital marketing",
    ],

    Design: [
      "design",
      "creative",
      "ux",
      "ui",
      "product design",
      "graphic design",
    ],

    Business: [
      "business",
      "finance",
      "accounting",
      "management",
      "customer service",
      "hr",
      "human resources",
    ],
  };

  // =========================
  // LOAD JOBS
  // =========================

  async function loadJobs() {
    try {
      setLoading(true);
      setError("");

      const data = await getJobs();

      console.log("Jobs loaded:", data);

      setJobs(data);
    } catch (err) {
      console.error(err);

      setError(
        "We couldn't load the jobs right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  // =========================
  // SYNC CATEGORY WITH URL
  // =========================

  useEffect(() => {
    const urlCategory = searchParams.get("category");

    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      setCategory("all");
    }
  }, [searchParams]);

  // =========================
  // GET API CATEGORIES
  // =========================

  const categories = useMemo(() => {
    const values = jobs
      .map((job) => job.category)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  // =========================
  // GET JOB TYPES
  // =========================

  const jobTypes = useMemo(() => {
    const values = jobs
      .map((job) => job.job_type)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  // =========================
  // GET LOCATIONS
  // =========================

  const locations = useMemo(() => {
    const values = jobs
      .map((job) => job.candidate_required_location)
      .filter(Boolean);

    return [...new Set(values)];
  }, [jobs]);

  // =========================
  // CATEGORY CHECK
  // =========================

  function matchesSelectedCategory(job) {
    if (category === "all") {
      return true;
    }

    const jobCategory = job.category
      ?.toLowerCase()
      .trim();

    const selectedCategories =
      categoryMapping[category];

    // لو category مش موجودة في mapping
    if (!selectedCategories) {
      return jobCategory === category.toLowerCase();
    }

    return selectedCategories.some((item) =>
      jobCategory?.includes(item)
    );
  }

  // =========================
  // FILTER JOBS
  // =========================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search
        .toLowerCase()
        .trim();

      // Search
      const matchesSearch =
        !searchText ||
        job.title
          ?.toLowerCase()
          .includes(searchText) ||
        job.company_name
          ?.toLowerCase()
          .includes(searchText) ||
        job.category
          ?.toLowerCase()
          .includes(searchText) ||
        job.description
          ?.toLowerCase()
          .includes(searchText);

      // Category
      const matchesCategory =
        matchesSelectedCategory(job);

      // Job Type
      const matchesType =
        jobType === "all" ||
        job.job_type === jobType;

      // Location
      const matchesLocation =
        location === "all" ||
        job.candidate_required_location ===
          location;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesLocation
      );
    });
  }, [
    jobs,
    search,
    category,
    jobType,
    location,
  ]);

  // =========================
  // CATEGORY CHANGE
  // =========================

  function handleCategoryChange(e) {
    const value = e.target.value;

    setCategory(value);

    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value,
      });
    }
  }

  // =========================
  // CLEAR FILTERS
  // =========================

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setJobType("all");
    setLocation("");

    setSearchParams({});
  }

  // =========================
  // PAGE TITLE
  // =========================

  const pageTitle =
    category === "all"
      ? "Find your next opportunity."
      : `Find ${category} jobs.`;

  const pageDescription =
    category === "all"
      ? "Explore remote jobs from companies around the world."
      : `Explore the latest ${category} opportunities from companies around the world.`;

  // =========================
  // RENDER
  // =========================

  return (
    <div className="jobs-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="jobs-header">
        <div className="container">

          <span className="section-label">
            {category === "all"
              ? "OPPORTUNITIES"
              : `${category.toUpperCase()} JOBS`}
          </span>

          <h1>{pageTitle}</h1>

          <p>
            {pageDescription}
          </p>

        </div>
      </section>

      {/* =========================
          SEARCH
      ========================= */}

      <section className="jobs-search-section">
        <div className="container">

          <div className="jobs-search-box">

            <div className="search-input-wrapper">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search jobs, companies or skills..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  <i className="bi bi-x"></i>
                </button>
              )}

            </div>

            <button
              type="button"
              className="search-btn"
            >
              Search
            </button>

          </div>

        </div>
      </section>

      {/* =========================
          JOBS CONTENT
      ========================= */}

      <section className="jobs-content">

        <div className="container">

          <div className="row g-4">

            {/* =========================
                SIDEBAR
            ========================= */}

            <div className="col-lg-3">

              <aside className="filters-card">

                <div className="filters-header">

                  <h3>
                    <i className="bi bi-sliders"></i>
                    Filters
                  </h3>

                  <button
                    type="button"
                    onClick={clearFilters}
                  >
                    Clear
                  </button>

                </div>

                {/* CATEGORY */}

                <div className="filter-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={
                      handleCategoryChange
                    }
                  >

                    <option value="all">
                      All Categories
                    </option>

                    {Object.keys(
                      categoryMapping
                    ).map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* JOB TYPE */}

                <div className="filter-group">

                  <label>
                    Job Type
                  </label>

                  <select
                    value={jobType}
                    onChange={(e) =>
                      setJobType(
                        e.target.value
                      )
                    }
                  >

                    <option value="all">
                      All Types
                    </option>

                    {jobTypes.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* LOCATION */}

                <div className="filter-group">

                  <label>
                    Location
                  </label>

                  <select
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                  >

                    <option value="all">
                      All Locations
                    </option>

                    {locations.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

              </aside>

            </div>

            {/* =========================
                RESULTS
            ========================= */}

            <div className="col-lg-9">

              <div className="jobs-results-header">

                <div>

                  <h2>
                    {category === "all"
                      ? "Latest Jobs"
                      : `${category} Jobs`}
                  </h2>

                  {!loading &&
                    !error && (
                      <span>
                        {
                          filteredJobs.length
                        }{" "}
                        jobs found
                      </span>
                    )}

                </div>

              </div>

              {/* =========================
                  LOADING
              ========================= */}

              {loading && (
                <div className="row g-4">

                  {[1, 2, 3, 4, 5, 6].map(
                    (item) => (
                      <div
                        className="col-md-6"
                        key={item}
                      >
                        <JobSkeleton />
                      </div>
                    )
                  )}

                </div>
              )}

              {/* =========================
                  ERROR
              ========================= */}

              {!loading && error && (
                <div className="state-card error-state">

                  <div className="state-icon">

                    <i className="bi bi-wifi-off"></i>

                  </div>

                  <h3>
                    Something went wrong
                  </h3>

                  <p>
                    {error}
                  </p>

                  <button
                    type="button"
                    className="retry-btn"
                    onClick={loadJobs}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                    Try Again
                  </button>

                </div>
              )}

              {/* =========================
                  EMPTY
              ========================= */}

              {!loading &&
                !error &&
                filteredJobs.length === 0 && (
                  <div className="state-card">

                    <div className="state-icon">

                      <i className="bi bi-search"></i>

                    </div>

                    <h3>
                      No jobs found
                    </h3>

                    <p>
                      Try changing your search
                      or filters to find more
                      opportunities.
                    </p>

                    <button
                      type="button"
                      className="retry-btn"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>

                  </div>
                )}

              {/* =========================
                  JOB CARDS
              ========================= */}

              {!loading &&
                !error &&
                filteredJobs.length > 0 && (
                  <div className="row g-4">

                    {filteredJobs.map(
                      (job) => (
                        <div
                          className="col-md-6"
                          key={job.id}
                        >
                          <JobCard job={job} />
                        </div>
                      )
                    )}

                  </div>
                )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="jobs-cta">

        <div className="container">

          <div className="jobs-cta-box">

            <div>

              <span>
                KEEP EXPLORING
              </span>

              <h2>
                Your next opportunity could
                be one click away.
              </h2>

            </div>

            <Link to="/">
              Back Home
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Jobs;