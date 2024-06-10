import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const handleTelegramBack = () => {
      // Memanggil fungsi navigasi mundur dari Telegram WebApp
      window.Telegram.WebApp.goBack();
    };

    // Mendengarkan event dari Telegram WebApp untuk kembali
    window.addEventListener('tgBack', handleTelegramBack);

    // Membersihkan event listener saat komponen dibongkar
    return () => {
      window.removeEventListener('tgBack', handleTelegramBack);
    };
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data?select=telegram_name,coins&order=coins.desc', {
          method: 'GET',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching leaderboard');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
      }
    };

    fetchLeaderboard();
  }, []);
  

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-start pt-14 w-full px-4">
        <img src="../badge.png" alt="Coin Logo" className="w-32 h-32 mb-4" />
        <div className="bg-slate-800 w-full max-w-screen-lg rounded-md mt-4 p-4 flex flex-col" style={{ maxHeight: '70vh' }}>
          <div className='text-center text-yellow-400 font-bold font-mono bg-slate-500 rounded-lg w-full py-2 mb-4 outline'>
            Leaderboard
          </div>
          <div className="flex flex-col text-white text-xs overflow-y-auto">
            {users.map((user, index) => (
              <div key={index} className="flex justify-between p-2 border-b border-gray-700">
                 <span>{index + 1}.</span>
                <span>{user.telegram_name}</span>
                <span>{user.coins.toLocaleString()} coins</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
