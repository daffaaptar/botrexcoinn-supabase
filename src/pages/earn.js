import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTonConnectUI, TonConnectButton } from '@tonconnect/ui-react';

const Earn = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [telegramId, setTelegramId] = useState(null);
  const [username, setUsername] = useState('');
  const [telegramName, setTelegramName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
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
  }, []);

  const handleConnectWallet = async () => {
    try {
      await tonConnectUI.connectWallet();
      const connectedWallet = tonConnectUI.wallet;
      if (connectedWallet) {
        setAddress(connectedWallet.address);
        await saveAddressToSupabase(connectedWallet.address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const saveAddressToSupabase = async (walletAddress) => {
    try {
      const bodyData = JSON.stringify({
        telegram_id: telegramId,
        username: username,
        telegram_name: telegramName,
        address: walletAddress
      });

      console.log('Sending data to Supabase:', bodyData); // Log data to be sent

      const response = await fetch('https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: bodyData
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error details:', errorDetails); // Log error details
        throw new Error('Error saving address to Supabase');
      }

      const data = await response.json();
      console.log('Address saved to Supabase:', data);
    } catch (error) {
      console.error('Error saving address to Supabase:', error);
    }
  };

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-start">
      <FontAwesomeIcon 
        className='p-2 bg-yellow-400 outline rounded-lg text-left absolute top-0 left-0 ml-4 mt-5 cursor-pointer' 
        icon={faArrowLeft} 
        onClick={() => window.history.back()} 
      />
      {/* Button wallet */}
      <div className="w-full flex justify-end p-4">
        <TonConnectButton className="my-button-class" onClick={handleConnectWallet} />
      </div>

      {/* Component Coins */}
      <div className="flex flex-col items-center justify-center pt-5 w-full px-4">
        <img src="../morebtx.png" alt="Coin Logo" className="w-48 h-48" />
        <h1 className='font-mono font-bold text-2xl bg-yellow-400 rounded-lg px-3 mt-4'>Get More Botrexcoins</h1>
      </div>
    </div>
  );
}

export default Earn;
