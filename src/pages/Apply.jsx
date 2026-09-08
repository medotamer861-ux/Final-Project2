import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.trim().length < 30) {
      newErrors.coverLetter =
        "Cover letter must be at least 30 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    Swal.fire({
      title: "Application Submitted!",
      text: "Your application has been submitted successfully.",
      icon: "success",
      confirmButtonText: "Back to Jobs",
    }).then(() => {
      navigate("/jobs");
    });
  }

  return (
    <div className="apply-page">
      <div className="container">

        <div className="apply-wrapper">

          {/* HEADER */}

          <div className="apply-header">

            <button
              className="back-button"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>

            <span className="section-label">
              JOB APPLICATION
            </span>

            <h1>
              Apply for this
              <span> opportunity.</span>
            </h1>

            <p>
              Complete the form below to submit your
              application.
            </p>

          </div>


          {/* FORM */}

          <div className="apply-card">

            <div className="apply-card-header">

              <div className="apply-icon">
                <i className="bi bi-briefcase-fill"></i>
              </div>

              <div>
                <h2>
                  Your Application
                </h2>

                <p>
                  Job ID: #{id}
                </p>
              </div>

            </div>


            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <div className="input-wrapper">

                  <i className="bi bi-person"></i>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

                {errors.name && (
                  <small className="form-error">
                    {errors.name}
                  </small>
                )}

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">

                  <i className="bi bi-envelope"></i>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

                {errors.email && (
                  <small className="form-error">
                    {errors.email}
                  </small>
                )}

              </div>


              {/* PHONE */}

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <div className="input-wrapper">

                  <i className="bi bi-telephone"></i>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

                {errors.phone && (
                  <small className="form-error">
                    {errors.phone}
                  </small>
                )}

              </div>


              {/* COVER LETTER */}

              <div className="form-group">

                <label htmlFor="coverLetter">
                  Cover Letter
                </label>

                <div className="textarea-wrapper">

                  <i className="bi bi-file-text"></i>

                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows="7"
                    placeholder="Tell the company why you're a great fit..."
                    value={formData.coverLetter}
                    onChange={handleChange}
                  />

                </div>

                {errors.coverLetter && (
                  <small className="form-error">
                    {errors.coverLetter}
                  </small>
                )}

              </div>


              {/* RESUME */}

              <div className="form-group">

                <label>
                  Resume
                  <span className="optional">
                    Optional
                  </span>
                </label>

                <label className="resume-upload">

                  <i className="bi bi-cloud-arrow-up"></i>

                  <div>
                    <strong>
                      Upload your resume
                    </strong>

                    <span>
                      PDF, DOC or DOCX
                    </span>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                  />

                </label>

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-application"
              >
                Submit Application

                <i className="bi bi-arrow-right"></i>
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Apply;