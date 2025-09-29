import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import "./WinnerAnnouncement.css";

function WinnerAnnouncement({ winner, runnerUp }) {
  const [show, setShow] = useState(true);

  // Fireworks instance
  const [fireInstance, setFireInstance] = useState(null);

  const makeShot = (angle, originX) => {
    fireInstance &&
      fireInstance({
        particleCount: 80,
        angle,
        spread: 55,
        origin: { x: originX, y: 0.7 },
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      makeShot(60, 0); // left fireworks
      makeShot(120, 1); // right fireworks
    }, 700);

    const timer = setTimeout(() => {
      setShow(false);
      clearInterval(interval);
    }, 6000); // animation lasts 6s

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [fireInstance]);

  if (!show) return null;

  return (
    <div className="announcement-overlay">
      <Confetti recycle={true} numberOfPieces={300} />
      <ReactCanvasConfetti refConfetti={setFireInstance} style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }} />

      <div className="announcement-card">
        <h2 className="title">🏆 Contest Results 🏆</h2>
        <div className="winner">🥇 Winner: <span>{winner}</span></div>
        <div className="runner">🥈 Runner-Up: <span>{runnerUp}</span></div>
        <p className="celebrate">🎊 Congratulations 🎊</p>
      </div>
    </div>
  );
}

export default WinnerAnnouncement;
