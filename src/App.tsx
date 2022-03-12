import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { Characters } from './pages/characters/Characters';
import { CharacterDetails } from './pages/characterDetails/CharacterDetails';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
