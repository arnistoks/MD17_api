import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './episodesPage.module.scss';
import { Episode } from '../../models/EpisodesModel';
import Loader from '../../components/Loader/Loader';

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
    setInputValue('');
  }, [findEpisode]);

  return (
    <section className={styles.section}>
      {loading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.title}>Episodes</h1>
        <form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            setInputValue('');
          }}
        >
          <input
            className={styles.search__input}
            type="text"
            placeholder="Search by episode name"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <button
            type="submit"
            className={styles.search__button}
            onClick={() => setFindEpisode(inputValue)}
          >
            Search
          </button>
        </form>
        <div className={styles.box}>
          {episodes && episodes.map((episode) => (
            <div
              className={styles.card}
              key={Math.random()}
            >
              <div>
                <div>
                  <span>Name: </span>
                  <span className={styles.name}>{episode.name}</span>
                </div>
                <div>
                  <span>Air Date: </span>
                  <span className={styles.info}>{episode.air_date}</span>
                </div>
                <div>
                  <span>Episode: </span>
                  <span className={styles.info}>{episode.episode}</span>
                </div>
              </div>

              <div className={styles.card__row}>
                <button
                  className={styles.card__button}
                  onClick={() => navigate(`/episodes/${episode.id}`)}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default EpisodesPage;
