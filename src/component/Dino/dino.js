import React, { useEffect, useRef, useState } from "react";
import "./Dino.css";

function Dino() {
  const dinoRef = useRef();
  const cactusRef = useRef();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const cactusIntervalRef = useRef(null); // Ref untuk menyimpan ID interval cactus

  const jump = () => {
    if (!!dinoRef.current && dinoRef.current.classList !== "jump") {
      dinoRef.current.classList.add("jump");
      setTimeout(function () {
        dinoRef.current.classList.remove("jump");
      }, 300);
    }
  };

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
          alert("Game Over! Your Score : " + score);
          setScore(0);
          setGameStarted(false); // Set gameStarted ke false setelah game over
          clearInterval(cactusIntervalRef.current); // Hentikan interval cactus saat game berakhir
        } else {
          setScore((prevScore) => prevScore + 1);
        }
      }, 10);

      // Simpan ID interval cactus di useRef
      cactusIntervalRef.current = isAlive;

      return () => clearInterval(isAlive);
    }
  }, [gameStarted, score]);

  useEffect(() => {
    if (gameStarted) {
      // Hanya memulai interval cactus jika game sudah dimulai
      const interval = setInterval(() => {
        // Gerakkan cactus
        const cactus = cactusRef.current;
        if (cactus) {
          const cactusLeft = parseInt(
            getComputedStyle(cactus).getPropertyValue("left")
          );
          cactus.style.left = cactusLeft - 1 + "px";
        }
      }, 100); // Mengatur interval agar kecepatan cactus lebih lambat

      // Membersihkan interval saat komponen unmount atau game berakhir
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
    <div className="game" onTouchStart={handleTouchStart}>
      Score : {score}
      <div id="dino" ref={dinoRef}></div>
      {gameStarted && <div id="cactus" ref={cactusRef}></div>}
    </div>
  );
}

export default Dino;
