import { useEffect, useState } from 'react';
import Button from './component/button';
import Dino from "./component/Dino/dino";
import './App.css';
import supabase from './supabaseClient'; // Import koneksi ke Supabase

const tele = window.Telegram.WebApp;

function App() {
  const [coins, setCoins] = useState(0);
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    tele.ready();
    fetchCoins(); // Panggil fungsi untuk memuat koin pengguna saat komponen dimuat
    // Mendapatkan ID Telegram pengguna dari URL saat aplikasi dimuat
    const urlParams = new URLSearchParams(window.location.search);
    const telegramIdFromUrl = urlParams.get('telegram_id');
    setTelegramId(telegramIdFromUrl);
  }, []);

  const fetchCoins = async () => {
    try {
      if (telegramId) {
        const { data, error } = await supabase
          .from('users')
          .select('coins')
          .eq('telegram_id', telegramId);

        if (error) {
          console.error('Error fetching coins:', error.message);
          return;
        }

        if (data && data.length > 0) {
          setCoins(data[0].coins); // Mengatur jumlah koin dari data yang diperoleh dari Supabase
        }
      }
    } catch (error) {
      console.error('Error fetching coins:', error.message);
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
    setCoins(prevCoins => prevCoins + score);
    try {
      if (telegramId) {
        // Simpan jumlah koin pengguna ke Supabase saat permainan berakhir
        const { data,error } = await supabase
          .from('users')
          .upsert([{ 
            telegram_id: telegramId, 
            coins: coins + score 
          }], { 
            returning: 'minimal' 
          });

        if (error) {
          console.error('Error saving coins:', error.message);
        }
      }
    } catch (error) {
      console.error('Error saving coins:', error.message);
    }
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
