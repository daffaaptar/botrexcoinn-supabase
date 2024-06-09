import { useEffect, useState } from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    tele.ready();
    const urlParams = new URLSearchParams(window.location.search);
    const telegramIdFromUrl = urlParams.get('telegram_id');
    const usernameFromUrl = urlParams.get('username');
    const telegramNameFromUrl = urlParams.get('telegram_name');
    
    console.log('Telegram ID:', telegramIdFromUrl);
    console.log('Username:', usernameFromUrl);
    console.log('Telegram Name:', telegramNameFromUrl);

    setTelegramId(telegramIdFromUrl);
    setUsername(usernameFromUrl);
    setTelegramName(telegramNameFromUrl);

    if (telegramIdFromUrl) {
      fetchOrCreateUser(telegramIdFromUrl, usernameFromUrl, telegramNameFromUrl);
    }
  }, []);

  const logToBackend = async (message) => {
    try {
      await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/logs', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
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

  const fetchOrCreateUser = async (telegramId, username, telegramName) => {
    try {
      const response = await fetch(`https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?telegram_id=eq.${telegramId}`, {
        method: 'GET',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching user');
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setCoins(data[0].coins);
      } else {
        // User not found, create a new user
        await createUser(telegramId, username, telegramName);
      }
    } catch (error) {
      console.error('Error fetching or creating user:', error.message);
    }
  };

  const createUser = async (telegramId, username, telegramName) => {
    try {
      const response = await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          username: username,
          telegram_name: telegramName,
          coins: 0
        })
      });

      if (!response.ok) {
        throw new Error('Error creating user');
      }

      const data = await response.json();
      setCoins(data[0].coins);
      showNotification('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error.message);
      showNotification(`Error creating user: ${error.message}`);
    }
  };

  const saveCoins = async (telegramId, newCoins, username, telegramName) => {
    logToBackend(`saveCoins called with telegramId: ${telegramId}, newCoins: ${newCoins}, username: ${username}, and telegramName: ${telegramName}`);
    showNotification(`saveCoins called with telegramId: ${telegramId}, newCoins: ${newCoins}, username: ${username}, and telegramName: ${telegramName}`);
    try {
      const response = await fetch(`https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?telegram_id=eq.${telegramId}`, {
        method: 'PATCH',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ coins: newCoins, username: username, telegram_name: telegramName })
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
      await saveCoins(telegramId, newCoins, username, telegramName);
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
