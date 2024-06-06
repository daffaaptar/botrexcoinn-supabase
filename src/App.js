import { useEffect, useState } from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    tele.ready();
  });

  const handleEarnClick = () => {
    console.log('Earn button clicked');
  };

  const handleFriendClick = () => {
    console.log('Friend button clicked');
  };

  const handleBoostClick = () => {
    console.log('Boost button clicked');
  };

  const handleGameOver = (score) => {
    setCoins(prevCoins => prevCoins + score);
  };

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
      {/* Coin Container */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-slate-700 rounded-md p-4 mb-2 flex items-center justify-center">
          {/* Logo Coin */}
          <img src="./btx.png" alt="Coin Logo" className="w-20 h-20" />
          <div className="bg-slate-500 rounded-md px-2 m-5 text-white text-2xl font-bold">
            {/* Jumlah Coin */}
            {coins.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="game">
        <Dino onGameOver={handleGameOver} />
      </div>

      {/* Button Container */}
      <div className="flex bg-slate-700 rounded-md my-5 px-5 justify-center">
        <div className="flex justify-center items-center mb-5 mt-5">
          <Button type="earn" onClick={handleEarnClick} />
          <Button type="friend" onClick={handleFriendClick} />
          <Button type="boost" onClick={handleBoostClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
