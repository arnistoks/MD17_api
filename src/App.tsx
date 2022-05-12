import React from 'react';
import './App.scss';
import {
  BrowserRouter as
  Router, NavLink, Route, Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CharactersPage from './pages/CharactersPage';
import EpisodesPage from './pages/EpisodesPage';
import LocationsPage from './pages/LocationsPage';
import CharacterPage from './pages/CharacterPage';
import Page404 from './pages/Page404';
import Logo from './data/logo.png';
import Up from './data/up.png';
import EpisodePage from './pages/EpisodePage';
import LocationPage from './pages/LocationPage';

const App = () => (
  <div className="App">
    <Router>
      <header className="header">
        <div className="logo rotate">
          <img src={Logo} alt="Logo" width="100" />
        </div>
        <nav className="navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'link link--active' : 'link')}>Home</NavLink>
          <NavLink to="/characters" className={({ isActive }) => (isActive ? 'link link--active' : 'link')}>Characters</NavLink>
          <NavLink to="/episodes" className={({ isActive }) => (isActive ? 'link link--active' : 'link')}>Episodes</NavLink>
          <NavLink to="/locations" className={({ isActive }) => (isActive ? 'link link--active' : 'link')}>Locations</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'link link--active' : 'link')}>About</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/episodes/:id" element={<EpisodePage />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <footer className="footer">
        <nav className="navigation navigation__footer">
          <NavLink to="/" className="link">Home</NavLink>
          <NavLink to="/characters" className="link">Characters</NavLink>
          <NavLink to="/episodes" className="link">Episodes</NavLink>
          <NavLink to="/about" className="link">About</NavLink>
        </nav>
        <span className="made">Made by me</span>
      </footer>
    </Router>
    <button className="up__button" onClick={() => window.scrollTo(0, 0)}>
      <img className="up__image" src={Up} alt="Up" />
    </button>
  </div>
);

export default App;
