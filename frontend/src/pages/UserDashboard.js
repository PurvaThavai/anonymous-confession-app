import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addConfession } from "../services/UserService";
import { OwnConfessions } from "../components/OwnConfessions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDashboard() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
  });

  const categories = [
    "first love",
    "secret crush",
    "missed connections",
    "confessions",
    "second chances",
    "romantic gestures",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await addConfession(formData, token);

      toast.success(response.message, {
        position: "top-center",
        autoClose: 5000,
      });

      setFormData({ category: "", title: "", content: "" });
    } catch (error) {
      toast.error("Failed to add confession. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff", // 🤍 white background for page
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
      <Container className="py-5">
        <ToastContainer />

        {/* Header */}
        <section className="mb-5 text-center">
          <h1 className="fw-bold" style={{ color: "#cf0f47" }}>
            User Dashboard 💌
          </h1>
          <p className="lead" style={{ color: "#FF0B55" }}>
            Share your secrets safely — your identity stays hidden 💖
          </p>
        </section>

        {/* Confession Form */}
        <Row className="justify-content-center mb-5">
          <Col lg={8}>
            <div
              className="p-4 rounded-4"
              style={{
                background: "linear-gradient(135deg, #000000, #cf0f47 60%, #000000)",
                color: "#fff",
                borderRadius: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <h4 className="text-center mb-4 fw-bold" style={{ color: "#ffdeee" }}>
                ✨ Add a Confession
              </h4>
              <Form onSubmit={handleSubmit}>
                {/* Category Dropdown */}
                <Form.Group className="mb-3 text-start">
                  <Form.Label style={{ color: "#FFDEDE" }}>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border-0"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#cf0f47",
                      fontWeight: "500",
                    }}
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Title */}
                <Form.Group className="mb-3 text-start">
                  <Form.Label style={{ color: "#FFDEDE" }}>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border-0"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#cf0f47",
                      fontWeight: "500",
                    }}
                  />
                </Form.Group>

                {/* Content */}
                <Form.Group className="mb-4 text-start">
                  <Form.Label style={{ color: "#FFDEDE" }}>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your confession..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className="border-0"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#cf0f47",
                      fontWeight: "500",
                    }}
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    className="fw-bold"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#cf0f47",
                      border: "none",
                      padding: "10px 25px",
                      borderRadius: "10px",
                    }}
                  >
                    Post Confession 💫
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        {/* User's Own Confessions */}
        <section className="text-center">
          <h3 className="fw-bold mb-3" style={{ color: "#cf0f47" }}>
            💭 Your Confessions
          </h3>
          <div
            className="p-4 rounded-4"
            style={{
              background: "linear-gradient(135deg, #000000, #cf0f47 60%, #000000)",
              color: "#fff",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "20px",
                color: "#cf0f47",
              }}
            >
              <OwnConfessions />
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
