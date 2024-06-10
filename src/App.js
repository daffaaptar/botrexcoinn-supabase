import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const navigate = useNavigate();

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
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const saveCoins = async (telegramId, newCoins, username, telegramName) => {
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
    } catch (error) {
      console.error('Error saving coins:', error.message);
    }
  };

  const handleGameOver = async (score) => {
    const newCoins = coins + score;
    setCoins(newCoins);

    if (telegramId) {
      await saveCoins(telegramId, newCoins, username, telegramName);
    }
  };
  const [topPlayer, setTopPlayer] = useState('');

  useEffect(() => {
    const fetchTopPlayer = async () => {
      try {
        const response = await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?select=telegram_name&order=coins.desc&limit=1', {
          method: 'GET',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching top player');
        }

        const data = await response.json();
        if (data && data.length > 0) {
          setTopPlayer(data[0].telegram_name);
        }
      } catch (error) {
        console.error('Error fetching top player:', error.message);
      }
    };

    fetchTopPlayer();
  }, []);

  const handleEarnClick = () => {
    navigate('/pages/earn'); // Langkah 3: Mengarahkan pengguna ke halaman earn.js
  };

  

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center mt-3 px-4 w-full">

        {/* Leaderboard Container */}
        <div className="bg-yellow-400 outline rounded-md mb-1 flex items-center justify-center w-full" onClick={() => navigate('/pages/leaderboard')}>
          <div className="rounded-md w-64">
            <div className='text-sm py-1 font-bold'>
              <h1>Top Players - <span className='text-red-600'>{topPlayer}</span>🔥</h1>
            </div>
          </div>
          <button className='font-bold pl-5 mb-1 mt-1 text-lg'>+</button>
        </div>
         
        {/* Coins Cointainer */}
        <div className="bg-slate-700 rounded-md p-1 mb-2 mt-1 flex items-center justify-center w-full">
          <img src="./btx.png" alt="Coin Logo" className="w-20 h-20 mr-4" />
          <div className="bg-slate-500 rounded-md w-44 m-2 outline-dashed">
            <div className='text-yellow-400 text-lg text-center font-bold'>{coins.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="game">
        <Dino onGameOver={handleGameOver} />
      </div>

      <div className="flex flex-col items-center justify-center mt-3 px-4 w-full">
        <div className=" bg-slate-700 rounded-md my-3 px- justify-center w-full">
          <div className="flex justify-center items-center mb-3 mt-3">
            <Button type="earn" onClick={() => navigate('/pages/earn')} />
            <Button type="friend" onClick={() => console.log('Friend button clicked')} />
            <Button type="boost" onClick={() => console.log('Boost button clicked')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
