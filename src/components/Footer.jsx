function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-5">

            <div className="footer-brand">
              <i className="bi bi-briefcase-fill"></i>

              <span>
                Hire<span>Flow</span>
              </span>
            </div>

            <p className="footer-description">
              Find your next opportunity and take the next
              step in your career with HireFlow.
            </p>

          </div>

          <div className="col-6 col-lg-2">

            <h5>Platform</h5>

            <a href="/">Home</a>
            <a href="/jobs">Find Jobs</a>
            <a href="/jobs">Categories</a>

          </div>

          <div className="col-6 col-lg-2">

            <h5>Company</h5>

            <a href="/">About</a>
            <a href="/">Contact</a>
            <a href="/">Careers</a>

          </div>

          <div className="col-12 col-lg-3">

            <h5>Follow Us</h5>

            <div className="social-links">

              <a href="/">
                <i className="bi bi-linkedin"></i>
              </a>

              <a href="/">
                <i className="bi bi-github"></i>
              </a>

              <a href="/">
                <i className="bi bi-twitter-x"></i>
              </a>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 HireFlow. All rights reserved.
          </span>

          <span>
            Built with React
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;