"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";

const Home = () => {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25分
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // "work" or "break"

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            handleSwitchMode();
            return mode === "work" ? 300 : 1500; // 5分休憩 or 25分作業
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const handleSwitchMode = () => {
    setMode((prevMode) => (prevMode === "work" ? "break" : "work"));
  };

  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.container}>
      <h1>ポモドーロタイマー</h1>
      <h2>{mode === "work" ? "作業時間" : "休憩時間"}</h2>
      <div className={styles.timer}>{formatTime(secondsLeft)}</div>
      <div className={styles.controls}>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "停止" : "開始"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(1500);
            setMode("work");
          }}
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default Home;
