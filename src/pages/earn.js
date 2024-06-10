import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Earn = () => {
  return (
    <div className="bg-bgtetris bg-cover bg-center min-h-screen flex flex-col items-center justify-between">
    <FontAwesomeIcon className='p-2 bg-yellow-400 outline  rounded-lg text-left absolute top-0 left-0 ml-4 mt-5 cursor-pointer' icon={faArrowLeft} onClick={() => window.history.back()} />
      <div className="flex flex-col items-center justify-center mt-20 px-4 w-full">
        {/* Wallet Container */}
        <div className="bg-blue-500 outline rounded-md mb-1 flex items-center justify-center w-full">
          <div className="rounded-md flex items-center">
            <img src="../wallet.png" alt="Wallet Logo" className="w-10 h-10 mr-2" />
            <div className='text-sm py-1 text-white font-mono font-bold'>
              <h1>Connect to your wallet</h1>
              </div>
            <button className='font-bold pl-5 mb-1 mt-1 text-lg text-white'>+</button>
            </div>
          </div>
        <div className="flex flex-col items-center justify-start pt-5 w-full px-4">
    <img src="../morebtx.png" alt="Coin Logo" className="w-48 h-48" />
    <h1 className='font-mono font-bold text-2xl bg-yellow-400 rounded-lg px-3'>Get More Botrexcoins</h1>
    </div>
      </div>
         </div>
  );
}

export default Earn;
