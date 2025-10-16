import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LandingPage from './pages/LandingPage.jsx';
import './i18n'; // Add this line - IMPORTANT!
import './index.css';
import EndingPage from "./components/EndingPage.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/ending" element={<EndingPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);