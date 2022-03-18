import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { CharacterDetail } from './pages/characterDetails/CharacterDetail';
import { Characters } from './pages/characters/Characters';

function App(): JSX.Element {
  /* <main className="flex-1 my-4 flex flex-col justify-center" />; */

  return (
    <div className="App min-h-screen flex flex-col ">
      <Header />
      <main className="flex flex-1 flex-col">
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
