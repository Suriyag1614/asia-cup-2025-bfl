import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "./WinnerAnnouncement.css";

function WinnerAnnouncement({ winner, runnerUp }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 10000); // auto-hide after 10s

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="announcement-overlay" onClick={() => setShow(false)}>
      {/* 🎊 Confetti */}
      <Confetti
        recycle={true}
        numberOfPieces={window.innerWidth < 768 ? 120 : 400}
      />

      {/* Popup Card */}
      <motion.div
        className="announcement-card"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <h2 className="title">🏆 Contest Results 🏆</h2>
        <motion.div
          className="winner"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🥇 Winner: <span className="highlight">{winner} 🏆</span>
        </motion.div>
        <motion.div
          className="runner"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🥈 Runner-Up: <span className="highlight">{runnerUp} 🎖️</span>
        </motion.div>
        <motion.p
          className="celebrate"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          🎊 Congratulations 🎊
        </motion.p>
        <p className="hint">(Tap/Click anywhere to dismiss)</p>
      </motion.div>
    </div>
  );
}

export default WinnerAnnouncement;
