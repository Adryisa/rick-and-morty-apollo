import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/header/Header';
import { CharacterDetails } from './pages/characterDetails/CharacterDetails';
import { Characters } from './pages/characters/Characters';
import { EpisodeDetails } from './pages/episodeDetails/EpisodeDetails';
import { Episodes } from './pages/episodes/Episodes';
import { LocationDetails } from './pages/locationDetails/LocationDetails';
import { Locations } from './pages/locations/Locations';

function App(): JSX.Element {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/*" element={<Characters />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/locations/*" element={<Locations />} />
          <Route path="/locations/:id" element={<LocationDetails />} />
          <Route path="/episodes/*" element={<Episodes />} />
          <Route path="/episodes/:id" element={<EpisodeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
