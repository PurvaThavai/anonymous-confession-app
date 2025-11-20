import React from "react";
import { ConfessionsList } from "../components/ConfessionsList";
import { PendingConfessions } from "../components/PendingConfessions";
import { AllUsers } from "../components/AllUsers";

export default function AdminDashboard() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff", // 🤍 white background for whole page
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <section
        className="py-5 text-center"
        style={{
          backgroundColor: "#ffffff",
          color: "#cf0f47",
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Admin Dashboard 🛠️</h1>
          <p className="lead" style={{ color: "#FF0B55" }}>
            Manage confessions and users with love & responsibility 💖
          </p>
        </div>
      </section>

      <div className="container pb-5">
        {/* Pending Confessions */}
        <section className="mb-5">
          <h3 className="fw-bold mb-3" style={{ color: "#cf0f47" }}>
            📥 Pending Confessions
          </h3>
          <div
            className="p-4 rounded-4"
            style={{
              background: "linear-gradient(135deg, #000000, #cf0f47 60%, #000000)",
              color: "#ffffff",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "15px",
                color: "#cf0f47",
              }}
            >
              <PendingConfessions />
            </div>
          </div>
        </section>

        {/* Registered Users */}
        <section className="mb-5">
          <h3 className="fw-bold mb-3" style={{ color: "#cf0f47" }}>
            👥 Registered Users
          </h3>
          <div
            className="p-4 rounded-4"
            style={{
              background: "linear-gradient(135deg, #000000, #cf0f47 60%, #000000)",
              color: "#ffffff",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "15px",
                color: "#cf0f47",
              }}
            >
              <AllUsers />
            </div>
          </div>
        </section>

        {/* All Confessions */}
        <section className="mb-5">
          <h3 className="fw-bold mb-3" style={{ color: "#cf0f47" }}>
            💬 All Confessions
          </h3>
          <div
            className="p-4 rounded-4"
            style={{
              background: "linear-gradient(135deg, #000000, #cf0f47 60%, #000000)",
              color: "#ffffff",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "15px",
                color: "#cf0f47",
              }}
            >
              <ConfessionsList />
            </div>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <section
        className="py-4 text-center"
        style={{
          backgroundColor: "#ffffff",
          color: "#cf0f47",
          borderTop: "1px solid rgba(207,15,71,0.2)",
        }}
      >
        <p className="mb-0">
          💫 Thank you for keeping SecretLove safe & positive 💖
        </p>
      </section>
    </div>
  );
}
