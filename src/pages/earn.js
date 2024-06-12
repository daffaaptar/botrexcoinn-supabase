import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useTonConnectUI, TonConnectButton} from '@tonconnect/ui-react';

const Earn = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [address, setAddress] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      const userWallet = tonConnectUI.wallet;
      if (userWallet) {
        setAddress(userWallet.address);
      }
    };
    checkConnection();
  }, [tonConnectUI]);

  const handleConnectWallet = async () => {
    try {
      const userWallet = tonConnectUI.wallet;
      if (!userWallet) {
        await tonConnectUI.connectWallet();
        const connectedWallet = tonConnectUI.wallet;
        if (connectedWallet) {
          setAddress(connectedWallet.address);
          await postAddressToSupabase(connectedWallet.address); // Post address to Supabase upon connection
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await tonConnectUI.disconnectWallet();
      setAddress('');
      console.log('Wallet disconnected'); // Log when wallet is disconnected
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const postAddressToSupabase = async (address) => {
    try {
      const apiUrl = 'https://dfbyxityclgnivmbkupr.supabase.co/rest/v1/data';
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k';
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ address: address })
      });

      const data = await response.json();
      console.log('Response from Supabase:', data);
    } catch (error) {
      console.error('Error posting address to Supabase:', error);
    }
  };

  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
    <FontAwesomeIcon
      className='p-2 bg-yellow-400 outline rounded-lg text-left absolute top-0 left-0 ml-4 mt-5 cursor-pointer'
      icon={faArrowLeft}
      onClick={() => window.history.back()}
    />
   <div className="flex flex-col items-center justify-center mt-20 px-4 w-full">
      {/* Wallet Container */}
      <div className="bg-blue-500 outline rounded-md mb-1 flex items-center justify-center w-full">
        <div className="rounded-md flex items-center">
          {/* <img src="../wallet.png" alt="Wallet Logo" className="w-10 h-10 mr-2" /> */}
          <div className='text-sm py-1 text-white font-mono font-bold'>
            {address ? (
              <h1>{address}</h1>
            ) : (
              <button className='cursor-pointer' onClick={handleConnectWallet}>
                {/* <h1>Connect to your wallet</h1> */}
                <TonConnectButton className="my-button-class" style={{ float: "right" }}/> {/* Gunakan TonConnectButton di sini */}
              </button>
            )}
          </div>
          {!address && (
            <button className='font-bold pl-5 mb-1 mt-1 text-lg text-white'></button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start pt-5 w-full px-4">
        <img src="../morebtx.png" alt="Coin Logo" className="w-48 h-48" />
        <h1 className='font-mono font-bold text-2xl bg-yellow-400 rounded-lg px-3'>Get More Botrexcoins</h1>
        {address && (
          <button className='mt-3 text-white' onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        )}
      </div>
    </div>
  </div>
);
}
export default Earn;
