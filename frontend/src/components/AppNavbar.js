import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const navigate = useNavigate();

  // Retrieve token from localStorage
  const token = localStorage.getItem("authToken");

  // Decode token to extract role
  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role; // either "admin" or "user"
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background:
          "linear-gradient(#000000",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.5), inset 0 -1px 6px rgba(255,11,85,0.3)",
        borderBottom: "1px solid rgba(255,11,85,0.25)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{
            color: "#FFDEDE",
            fontWeight: "700",
            letterSpacing: "1px",
            textShadow: "0 0 8px rgba(255, 11, 85, 0.4)",
          }}
        >
          ❤️ SecretLove
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Common Links */}
            {[
              { to: "/", text: "Home" },
              { to: "/about", text: "About Us" },
              { to: "/stories", text: "Confessions" },
            ].map((link) => (
              <li className="nav-item" key={link.to}>
                <Link
                  className="nav-link"
                  to={link.to}
                  style={{
                    color: "#FFDEDE",
                    transition: "0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                  onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                >
                  {link.text}
                </Link>
              </li>
            ))}

            {/* Conditional Dashboards */}
            {role === "user" && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/user"
                  style={{ color: "#FFDEDE" }}
                  onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                  onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                >
                  User Dashboard
                </Link>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin"
                  style={{ color: "#FFDEDE" }}
                  onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                  onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}

            {/* Show login/register if not logged in */}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#FFDEDE" }}
                    onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                    onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ color: "#FFDEDE" }}
                    onMouseEnter={(e) => (e.target.style.color = "#FF0B55")}
                    onMouseLeave={(e) => (e.target.style.color = "#FFDEDE")}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-sm text-white ms-2"
                  style={{
                    background: "linear-gradient(90deg, #CF0F47, #FF0B55)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    transition: "0.3s",
                    boxShadow: "0 0 6px rgba(255, 11, 85, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background =
                      "linear-gradient(90deg, #FF0B55, #CF0F47)";
                    e.target.style.boxShadow =
                      "0 0 12px rgba(255, 11, 85, 0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(90deg, #CF0F47, #FF0B55)";
                    e.target.style.boxShadow =
                      "0 0 6px rgba(255, 11, 85, 0.4)";
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
