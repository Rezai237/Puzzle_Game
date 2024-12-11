import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Profile from './pages/Profile';
import TopPlayers from './pages/TopPlayers';
import EarnTokens from './pages/EarnTokens';
import NotificationContainer from './components/notifications/NotificationContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="profile" element={<Profile />} />
          <Route path="top" element={<TopPlayers />} />
          <Route path="earn" element={<EarnTokens />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
}

export default App;