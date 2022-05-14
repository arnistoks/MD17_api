import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './charactersPage.module.scss';
import { Character } from '../../models/CharacterModel';
import Loader from '../../components/Loader/Loader';
import Next from '../../data/next.png';
import Prev from '../../data/prev.png';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activePage, setActivePage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getCharacters = async () => {
    const currentFilter = activeFilter === 'all' ? '' : `&status=${activeFilter}`;
    const currentPage = `?page=${activePage}`;

    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${currentPage}${currentFilter}`);
      setCharacters(response.data.results);
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
    getCharacters().then();
  }, [activePage, searchParams]);

  return (
    <section className={styles.section}>
      {loading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.title}>Characters</h1>
        <div className={styles.button__row}>
          <button
            className={styles.next__button}
            disabled={activePage === 1}
            onClick={() => {
              setActivePage(activePage - 1);
            }}
          >
            <img className="up__image" src={Prev} alt="Up" />
          </button>
          <button
            className={styles.button__all}
            onClick={() => {
              setActiveFilter('all');
              setSearchParams('');
            }}
          >
            All
          </button>
          <button
            className={styles.button__alive}
            onClick={() => {
              setActiveFilter('alive');
              setSearchParams({ status: 'alive' });
            }}
          >
            Alive
          </button>
          <button
            className={styles.button__dead}
            onClick={() => {
              setActiveFilter('dead');
              setSearchParams({ status: 'dead' });
            }}
          >
            Dead
          </button>
          <button
            className={styles.button__unknown}
            onClick={() => {
              setActiveFilter('unknown');
              setSearchParams({ status: 'unknown' });
            }}
          >
            Unknown
          </button>
          <button
            className={styles.next__button}
            disabled={activePage === 42}
            onClick={() => {
              setActivePage(activePage + 1);
            }}
          >
            <img className="up__image" src={Next} alt="Up" />
          </button>
        </div>
        <div className={styles.box}>
          {characters && characters.map(({
            id, name, image, status,
          }) => (
            <div
              className={styles.card}
              key={Math.random()}
            >
              <div>
                <img src={image} alt="Character" width="300" />
              </div>
              {status === 'Alive' && <div className={styles.status} style={{ backgroundColor: 'limegreen' }} />}
              {status === 'Dead' && <div className={styles.status} style={{ backgroundColor: 'orangered' }} />}
              {status === 'unknown' && <div className={styles.status} style={{ backgroundColor: 'yellow' }} />}
              <div className={styles.card__row}>
                <span className={styles.card__title}>
                  {name}
                </span>
                <button className={styles.card__button} onClick={() => navigate(`/characters/${id}`)}>Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default CharactersPage;
