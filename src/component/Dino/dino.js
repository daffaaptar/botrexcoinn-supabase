import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

function Dino({ onGameOver }) {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const cactusIntervalRef = useRef(null);

  const jump = () => {
    if (!!dinoRef.current && !dinoRef.current.classList.contains("jump")) {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " " && !gameStarted) {
      setGameStarted(true);
      jump();
    } else if (event.key === " " && gameStarted) {
      jump();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const isAlive = setInterval(function () {
        const dinoTop = parseInt(
          getComputedStyle(dinoRef.current).getPropertyValue("top")
        );
        let cactusLeft = parseInt(
          getComputedStyle(cactusRef.current).getPropertyValue("left")
        );

        if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 140) {
          onGameOver(score);
          setScore(0);
          setGameStarted(false);
          clearInterval(cactusIntervalRef.current);
        } else {
          setScore((prevScore) => prevScore + 1);
        }
      }, 10);

      cactusIntervalRef.current = isAlive;

      return () => clearInterval(isAlive);
    }
  }, [gameStarted, score, onGameOver]);

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        const cactus = cactusRef.current;
        if (cactus) {
          const cactusLeft = parseInt(
            getComputedStyle(cactus).getPropertyValue("left")
          );
          cactus.style.left = cactusLeft - 1 + "px";
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  const handleTouchStart = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    jump();
  };

  return (
    <div className="game pl-2" onTouchStart={handleTouchStart}>
      Coins : {score}
      <div id="dino" ref={dinoRef}></div>
      {gameStarted && <div id="cactus" ref={cactusRef}></div>}
    </div>
  );
}

export default Dino;
