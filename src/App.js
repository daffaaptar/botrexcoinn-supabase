import React, { useEffect, useState } from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import supabase from './supabaseClient';
import './App.css';

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    tele.ready();
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id') || tele.initDataUnsafe?.user?.id;
    if (userId) {
      setTelegramId(userId);
      fetchUserCoins(userId);
    }
  }, []);

  const fetchUserCoins = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('coins')
        .eq('telegram_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user coins:', error.message);
      } else if (data) {
        setCoins(data.coins);
        console.log(`Fetched ${data.coins} coins for user ID: ${userId}`);
      }
    } catch (err) {
      console.error('Unexpected error fetching user coins:', err);
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
    console.log('Game over with score:', score);
    const newCoins = coins + score;
    setCoins(newCoins);
    if (telegramId) {
      console.log('Saving user coins...');
      const { error } = await saveUserCoins(telegramId, newCoins);
      if (!error) {
        console.log('User coins saved successfully.');
      } else {
        console.error('Failed to save user coins:', error.message);
      }
    }
  };

  const saveUserCoins = async (userId, newCoins) => {
    try {
      console.log(`Attempting to save ${newCoins} coins for user ID: ${userId}`);
      const { error } = await supabase
        .from('users')
        .upsert({ telegram_id: userId, coins: newCoins }, { onConflict: ['telegram_id'] });

      return { error };
    } catch (err) {
      console.error('Unexpected error saving user coins:', err);
      return { error: err };
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
          console.error('Error connecting to Supabase:', error.message);
        } else {
          console.log('Connection to Supabase successful:', data);
        }
      } catch (err) {
        console.error('Unexpected error connecting to Supabase:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
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
