import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Episode } from '../models/EpisodesModel';
import Loader from '../components/Loader';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [findEpisode, setFindEpisode] = useState('');
  const navigate = useNavigate();

  const getEpisodes = async () => {
    setLoading(true);
    const search = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${search}`);
      setEpisodes(response.data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes().then();
  }, [findEpisode]);

  useEffect(() => {
    setInputValue('');
  }, [findEpisode]);

  return (
    <section className="section">
      {loading && <Loader />}
      <div className="container">
        <h1 className="title">Episodes</h1>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            setInputValue('');
          }}
        >
          <input
            className="search__input"
            type="text"
            placeholder="Search by episode name"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <button type="submit" className="search__button" onClick={() => setFindEpisode(inputValue)}>Search</button>
        </form>
        <div className="box">
          {episodes && episodes.map(({ id, name, episode }) => (
            <div
              className="card"
              key={Math.random()}
            >
              <div>
                <span>Name: </span>
                <span className="name">{name}</span>
              </div>
              <div>
                <span>Air Date: </span>
                <span className="info">air_date</span>
              </div>
              <div>
                <span>Episode: </span>
                <span className="info">{episode}</span>
              </div>
              <button className="card__button" onClick={() => navigate(`/episodes/${id}`)}>Read more</button>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default EpisodesPage;
