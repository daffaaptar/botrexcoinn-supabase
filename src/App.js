import {useEffect} from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  useEffect(()=>{
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

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-slate-800">
      {/* Coin Container */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-slate-700 rounded-md p-4 mb-2 flex items-center justify-center">
          {/* Logo Coin */}
          <img src="./btx.png" alt="Coin Logo" className="w-20 h-20" />
          <div className="bg-slate-700 rounded-md p-4 text-white text-2xl font-bold">
            {/* Jumlah Coin ( masih dummy data ) */}
            1000 Coins
          </div>
        </div>
      </div>

      <div className="game">
      <Dino />
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
