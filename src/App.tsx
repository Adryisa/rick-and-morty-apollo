import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { CharacterDetail } from './pages/characterDetails/CharacterDetails';
import { Characters } from './pages/characters/Characters';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
