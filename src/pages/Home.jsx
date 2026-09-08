import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="container">

          <div className="row align-items-center">

            {/* HERO CONTENT */}

            <div className="col-lg-7">

              <div className="hero-badge">
                <span></span>
                Thousands of jobs waiting for you
              </div>

              <h1>
                Find a job where
                <br />
                <span>you belong.</span>
              </h1>

              <p>
                Discover opportunities from companies around
                the world and find the role that matches your
                skills, goals, and ambitions.
              </p>

              <div className="hero-buttons">

                <Link
                  to="/jobs"
                  className="hero-primary-btn"
                >
                  Explore Jobs
                  <i className="bi bi-arrow-right"></i>
                </Link>

                <a
                  href="#categories"
                  className="hero-secondary-btn"
                >
                  Explore Categories
                </a>

              </div>

              {/* HERO STATS */}

              <div className="hero-stats">

                <div>
                  <strong>10K+</strong>
                  <span>Open Jobs</span>
                </div>

                <div>
                  <strong>5K+</strong>
                  <span>Companies</span>
                </div>

                <div>
                  <strong>50+</strong>
                  <span>Countries</span>
                </div>

              </div>

            </div>

            {/* HERO VISUAL */}

            <div className="col-lg-5">

              <div className="hero-card">

                {/* Floating Icons */}

                <div className="floating-icon icon-one">
                  <i className="bi bi-code-slash"></i>
                </div>

                <div className="floating-icon icon-two">
                  <i className="bi bi-palette"></i>
                </div>

                <div className="floating-icon icon-three">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>

                {/* Main Card */}

                <div className="hero-card-main">

                  <div className="hero-card-icon">
                    <i className="bi bi-briefcase"></i>
                  </div>

                  <span>
                    Career opportunity
                  </span>

                  <h3>
                    Your next chapter starts here.
                  </h3>

                  {/* Mini Job */}

                  <div className="mini-job">

                    <div className="mini-logo">
                      T
                    </div>

                    <div>
                      <strong>
                        Frontend Developer
                      </strong>

                      <small>
                        Tech Company · Remote
                      </small>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CATEGORIES SECTION
      ========================= */}

      <section
        className="categories-section"
        id="categories"
      >

        <div className="container">

          {/* SECTION HEADER */}

          <div className="section-heading">

            <div>

              <span className="section-label">
                EXPLORE
              </span>

              <h2>
                Browse by category
              </h2>

            </div>

            <Link to="/jobs">
              View all
              <i className="bi bi-arrow-up-right"></i>
            </Link>

          </div>


          {/* CATEGORY CARDS */}

          <div className="row g-4">

            {/* TECHNOLOGY */}

            <div className="col-md-6 col-lg-3">

              <Link
                to="/jobs?category=Technology"
                className="category-card"
              >

                <div className="category-icon">
                  <i className="bi bi-code-square"></i>
                </div>

                <h3>
                  Technology
                </h3>

                <span>
                  Software & Development
                </span>

                <i className="bi bi-arrow-up-right card-arrow"></i>

              </Link>

            </div>


            {/* MARKETING */}

            <div className="col-md-6 col-lg-3">

              <Link
                to="/jobs?category=Marketing"
                className="category-card"
              >

                <div className="category-icon">
                  <i className="bi bi-megaphone"></i>
                </div>

                <h3>
                  Marketing
                </h3>

                <span>
                  Marketing & Growth
                </span>

                <i className="bi bi-arrow-up-right card-arrow"></i>

              </Link>

            </div>


            {/* DESIGN */}

            <div className="col-md-6 col-lg-3">

              <Link
                to="/jobs?category=Design"
                className="category-card"
              >

                <div className="category-icon">
                  <i className="bi bi-brush"></i>
                </div>

                <h3>
                  Design
                </h3>

                <span>
                  Creative & Design
                </span>

                <i className="bi bi-arrow-up-right card-arrow"></i>

              </Link>

            </div>


            {/* BUSINESS */}

            <div className="col-md-6 col-lg-3">

              <Link
                to="/jobs?category=Business"
                className="category-card"
              >

                <div className="category-icon">
                  <i className="bi bi-bar-chart"></i>
                </div>

                <h3>
                  Business
                </h3>

                <span>
                  Business & Finance
                </span>

                <i className="bi bi-arrow-up-right card-arrow"></i>

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA SECTION
      ========================= */}

      <section className="cta-section">

        <div className="container">

          <div className="cta-box">

            <div>

              <span className="section-label">
                YOUR NEXT MOVE
              </span>

              <h2>
                Ready to find your next opportunity?
              </h2>

              <p>
                Explore thousands of jobs and discover
                where your skills can take you.
              </p>

            </div>

            <Link
              to="/jobs"
              className="cta-button"
            >
              Browse Jobs
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;