import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { CharacterDetail } from './pages/characterDetails/CharacterDetail';
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
      <Footer />
    </div>
  );
}

export default App;
