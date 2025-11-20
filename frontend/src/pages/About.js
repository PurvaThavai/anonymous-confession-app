import React from "react";

export default function About() {
  return (
    <div>
      {/* top Section */}
      <section
        className="py-5 text-center"
        style={{
          background:
            "linear-gradient(100deg, #000000, #cf0f47ff 60%, #000000)",
          color: "#f9f9f9ff",
        }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">About SecretLove 💌</h1>
          <p className="lead">
            A safe space to share your thoughts, secrets, and confessions —
            anonymously and without judgment.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section
        className="container py-5 text-center"
        style={{ color: "#cf0f47ff" }}
      >
        <p className="lead mb-4">
          SecretLove allows you to express your emotions freely and read stories
          shared by others around the world.
        </p>
      </section>

      {/* Features */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #010101ff, #fa1455ff)",
          color: "#fefeffff",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">
            🌟 Features of SecretLove
          </h2>
          <div className="row g-4">
            {[
              {
                title: "Anonymous Posting",
                text: "Express what words can’t — safely and secretly.",
              },
              {
                title: "Interactive Feed",
                text: "Discover heartfelt confessions from others and react to them.",
              },
              {
                title: "Responsive Design",
                text: "Enjoy a smooth experience across all devices.",
              },
              {
                title: "Safe & Secure",
                text: "We prioritize your privacy and emotional safety.",
              },
              {
                title: "Admin Moderation",
                text: "Ensures every post follows respectful community standards.",
              },
              {
                title: "Emotional Connection",
                text: "Find comfort in knowing others feel the same way.",
              },
            ].map((feature, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card h-100 border-0 shadow-sm text-center"
                  style={{
                    backgroundColor: "#ffffffff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    borderRadius: "15px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 10px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body">
                    <h5 className="fw-bold" style={{ color: "#cf0f47ff" }}>
                      {feature.title}
                    </h5>
                    <p className="text-muted">{feature.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section
        className="container py-5 text-center"
        style={{
          backgroundColor: "#fff",
          color: "#FF0B55",
        }}
      >
        <h2 className="mb-4 fw-bold">📜 Community Guidelines</h2>

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#fff5f8",
            borderRadius: "10px",
            border: "1px solid rgba(207,15,71,0.2)",
            padding: "20px 30px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#FF0B55",
              fontWeight: "500",
            }}
          >
            <tbody>
              {[
                "Be kind and respectful to everyone.",
                "Do not reveal personal identities or information.",
                "Avoid explicit or offensive content.",
                "Report inappropriate posts responsibly.",
                "No spam, fake, or repetitive confessions.",
                "Help us keep this a positive community ❤️",
              ].map((rule, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "12px 10px",
                      borderBottom:
                        index === 5 ? "none" : "1px solid rgba(207,15,71,0.15)",
                      textAlign: "left",
                    }}
                  >
                    {rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Developers */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #010101ff, #fa1455ff)", 
          color: "#fff",
        }}
      >
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">👩‍💻 Meet the Developers</h2>
          <div className="row g-4">
            {[
              {
                name: "Suyog Joshi",
                role: "Developer",
                img: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
              },
              {
                name: "Purva Thavai",
                role: "Developer",
                img: "https://cdn-icons-png.flaticon.com/512/921/921089.png",
              },
              {
                name: "Amey Raut",
                role: "Developer",
                img: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
              },
            ].map((dev, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card text-center border-0 h-100"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#cf0f47ff",
                    borderRadius: "15px",
                    boxShadow: "none",
                  }}
                >
                  <img
                    src={dev.img}
                    alt={dev.name}
                    className="rounded-circle mx-auto mt-4 border border-white"
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#ffffffff",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{dev.name}</h5>
                    <p className="card-text">{dev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ending section */}
      <section
        className="py-5 text-center"
        style={{
          backgroundColor: "#ffffff", 
          color: "#cf0f47ff", 
        }}
      >
        <div className="container">
          <h2 className="fw-bold">Whisper Your Feelings 💫</h2>
          <p className="lead" style={{ color: "#FF0B55" }}>
            Your words matter — even if they’re whispered in silence.
          </p>
        </div>
      </section>
    </div>
  );
}
