import React, { useEffect, useState } from "react";
import { getApprovedConfessions } from "../utils/storage";
import { Stories } from "../components/Stories";
export default function Home() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const approved = getApprovedConfessions();
    const shuffled = approved.sort(() => 0.5 - Math.random());
    const pick = shuffled.slice(0, Math.min(shuffled.length, 8)).slice(0, Math.max(4, Math.min(shuffled.length, 8)));
    setList(pick);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #000000, #9d002dff, #d9194fff, #9d002dff, #000000)",
          color: "#f9f9f9ff",
        }}
      >
        <div className="container">
          <h1 className="display-4">Anonymous Confessions</h1>
          <p className="lead">
            Share your heart secretly or read others' secrets in a safe space 💖
          </p>
        </div>
      </section>

      {/* Trending Confessions */}
      <section className="container py-5">
        <h2 className="mb-4 text-center" style={{ color: "#fa1455ff" }}>Trending Confessions</h2>

      </section>

        <Stories/>

      {/* Call to Action */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(130deg, #010101ff, #ff055dff)",
          color: "#fff",
        }}
      >
        <div className="container">
          <h2>Share Your Secret Now</h2>
          <p className="lead">Your identity stays hidden, but your feelings matter 💌</p>
        </div>
      </section>


    
    </div>
  );
}
