import React from "react";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <footer
      className="py-4 mt-5"
      style={{
        background: "linear-gradient(180deg, #000000 80%, #CF0F47 100%)",
        color: "#FFDEDE",
        fontSize: "0.9rem",
        lineHeight: "1.6",
        boxShadow: "0 -2px 8px rgba(255, 11, 85, 0.2)",
      }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* 🏠 Column 1 - Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "#FF0B55",
                borderBottom: "1px solid #FF0B55",
                display: "inline-block",
                paddingBottom: "4px",
              }}
            >
              Quick Links
            </h6>
            <ul className="list-unstyled mb-0">
              {[
                { to: "/", text: "Home" },
                { to: "/about", text: "About Us" },
                { to: "/login", text: "Login" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-decoration-none"
                    style={{
                      color: "#FFDEDE",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                    onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 📍 Column 2 - Address */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "#FF0B55",
                borderBottom: "1px solid #FF0B55",
                display: "inline-block",
                paddingBottom: "4px",
              }}
            >
              Address
            </h6>
            <p className="mb-1">🏠 SecretLove HQ</p>
            <p className="mb-1">📍 Pune, Maharashtra, India</p>
            <p className="mb-0">📧 contact@secretlove.com</p>
          </div>

          {/* 👩‍💻 Column 3 - Developers */}
          <div className="col-md-4">
            <h6
              className="fw-bold mb-3"
              style={{
                color: "#FF0B55",
                borderBottom: "1px solid #FF0B55",
                display: "inline-block",
                paddingBottom: "4px",
              }}
            >
              Developers
            </h6>
            <ul className="list-unstyled mb-0">
              <li>💻 Suyog Joshi</li>
              <li>💻 Purva Thavai</li>
              <li>💻 Amey Rout</li>
            </ul>
          </div>
        </div>

        <hr
          className="my-4"
          style={{ borderTop: "1px solid rgba(255, 11, 85, 0.3)" }}
        />

        <p
          className="text-center mb-0"
          style={{
            fontSize: "0.85rem",
            color: "#FFDEDE",
          }}
        >
          © 2025{" "}
          <span style={{ color: "#FF0B55", fontWeight: "600" }}>
            SecretLove
          </span>
          . All rights reserved 💞
        </p>
      </div>
    </footer>
  );
}
