import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import './index.css';
import App from './App';
import Leaderboard from './pages/leaderboard';
import Earn from './pages/earn';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="./public/tonconnect-manifest.json">
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/pages/leaderboard" element={<Leaderboard />} />
          <Route path="/pages/earn" element={<Earn />} />
        </Routes>
      </Router>
    </TonConnectUIProvider>
  </React.StrictMode>
);

reportWebVitals();
