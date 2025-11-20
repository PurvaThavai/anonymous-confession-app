import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getAllConfessions } from "../services/UserService";

export function Stories() {
  const [confessions, setConfessions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCards, setShowCards] = useState(false);

  const categories = [
    "first love",
    "secret crush",
    "missed connections",
    "confessions",
    "second chances",
    "romantic gestures",
  ];

  const fetchConfessions = async (category = "all") => {
    try {
      const data = await getAllConfessions(category);
      setConfessions(data);
      setShowCards(true);
    } catch (error) {
      console.error("Error fetching confessions:", error);
    }
  };

  useEffect(() => {
    fetchConfessions("all");
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff9fb",
        minHeight: "100vh",
      }}
    >
      <Container className="py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#d4164f" }}>
            Confessions & Stories 💌
          </h1>
          <p className="lead" style={{ color: "#ff477e" }}>
            Dive into secret tales of love, heartbreak, and hope 💖
          </p>
        </div>

        {/* Category Buttons */}
        <Row className="mb-5">
          <Col className="text-center">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {[{ cat: "all", label: "All Stories" }, ...categories.map((c) => ({ cat: c, label: c }))].map(
                (item) => (
                  <Button
                    key={item.cat}
                    style={{
                      background:
                        selectedCategory === item.cat
                          ? "linear-gradient(135deg, #0a0a0a, #d4164f 60%, #1a0006)"
                          : "#fff",
                      border:
                        selectedCategory === item.cat
                          ? "none"
                          : "2px solid #d4164f",
                      color: selectedCategory === item.cat ? "#fff" : "#d4164f",
                      fontWeight: "600",
                      borderRadius: "10px",
                      padding: "8px 20px",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => {
                      setSelectedCategory(item.cat);
                      fetchConfessions(item.cat);
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== item.cat) {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, #0a0a0a, #d4164f 60%, #1a0006)";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== item.cat) {
                        e.currentTarget.style.background = "#fff";
                        e.currentTarget.style.color = "#d4164f";
                      }
                    }}
                  >
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </Button>
                )
              )}
            </div>
          </Col>
        </Row>

        {/* Confession Cards */}
        {showCards && (
          <div className="py-3">
            <h2 className="mb-4 text-center fw-bold" style={{ color: "#d4164f" }}>
              {selectedCategory === "all"
                ? "All Confessions"
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Stories`}
            </h2>

            <Row>
              {confessions.length === 0 ? (
                <p className="text-center text-muted">
                  No confessions yet. Be the first to share 💌
                </p>
              ) : (
                confessions.map((c) => (
                  <Col md={3} className="mb-4" key={c.id}>
                    <div
                      className="card p-3 h-100"
                      style={{
                        background:
                          "linear-gradient(145deg, #2b0010, #e94173 60%, #3a0015)",
                        color: "#fff9fb",
                        border: "none",
                        borderRadius: "15px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        cursor: "pointer",
                        minHeight: "220px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(233,65,115,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(0,0,0,0.15)";
                      }}
                    >
                      <div>
                        <h6 className="text-warning text-uppercase mb-2">
                          {c.category}
                        </h6>
                        <h5 className="fw-bold">{c.title}</h5>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            color: "#fff9fb",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {c.content}
                        </p>
                      </div>
                      <small className="text-light mt-auto">
                        — {c.name || "Anonymous"}
                      </small>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
