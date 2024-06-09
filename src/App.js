import { useEffect, useState } from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    tele.ready();
    const urlParams = new URLSearchParams(window.location.search);
    const telegramIdFromUrl = urlParams.get('telegram_id');
    const usernameFromUrl = urlParams.get('username');
    
    console.log('Telegram ID:', telegramIdFromUrl);
    console.log('Username:', usernameFromUrl);  // Log the username to check if it's being captured correctly
    
    setTelegramId(telegramIdFromUrl);
    setUsername(usernameFromUrl);

    if (telegramIdFromUrl) {
      fetchCoins(telegramIdFromUrl);
    }
  }, []);

  const logToBackend = async (message) => {
    try {
      await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/logs', {
        method: 'POST',
        headers: {
          'apikey': '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY',
          'Authorization': `Bearer 7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Error logging to backend:', error.message);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const fetchCoins = async (telegramId) => {
    try {
      const response = await fetch(`https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?telegram_id=eq.${telegramId}`, {
        method: 'GET',
        headers: {
          'apikey': '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY',
          'Authorization': `Bearer 7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching coins');
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setCoins(data[0].coins);
      }
    } catch (error) {
      console.error('Error fetching coins:', error.message);
    }
  };

  const saveCoins = async (telegramId, newCoins, username) => {
    logToBackend(`saveCoins called with telegramId: ${telegramId}, newCoins: ${newCoins}, and username: ${username}`);
    showNotification(`saveCoins called with telegramId: ${telegramId}, newCoins: ${newCoins}, and username: ${username}`);
    try {
      const response = await fetch(`https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?telegram_id=eq.${telegramId}`, {
        method: 'PATCH',
        headers: {
          'apikey': '7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY',
          'Authorization': `Bearer 7170415970:AAHT91_gXLM_YDbe7Mpqg0-otpg2159PlvY`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ coins: newCoins, username: username })
      });

      if (!response.ok) {
        throw new Error('Error saving coins');
      }

      logToBackend('Coins saved successfully');
      showNotification('Coins saved successfully');
    } catch (error) {
      logToBackend(`Error saving coins: ${error.message}`);
      showNotification(`Error saving coins: ${error.message}`);
      console.error('Error saving coins:', error.message);
    }
  };

  const handleEarnClick = () => {
    console.log('Earn button clicked');
  };

  const handleFriendClick = () => {
    console.log('Friend button clicked');
  };

  const handleBoostClick = () => {
    console.log('Boost button clicked');
  };

  const handleGameOver = async (score) => {
    logToBackend(`Game over with coins: ${score}`);
    showNotification(`Game over with coins: ${score}`);
    const newCoins = coins + score;
    setCoins(newCoins);

    if (telegramId) {
      await saveCoins(telegramId, newCoins, username);
    }
  };

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
      {/* Notification */}
      {/* {notification && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center z-50">
          {notification}
        </div>
      )} */}

      {/* Coin Container */}
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-slate-700 rounded-md p-4 mb-2 flex items-center justify-center">
          <img src="./btx.png" alt="Coin Logo" className="w-20 h-20" />
          <div className="bg-slate-500 rounded-md px-2 m-5 text-white text-2xl font-bold">
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