import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Character } from '../models/CharacterModel';
import Loader from '../components/Loader';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getCharacters = async () => {
    const currentFilter = activeFilter === 'all' ? '' : `?status=${activeFilter}`;
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${currentFilter}`);
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
  }, [activeFilter]);

  return (
    <section className="section">
      {loading && <Loader />}
      <div className="container">
        <h1 className="title">Characters</h1>
        <div className="button__row">
          <button
            className="characters__button characters__button--all"
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button
            className="characters__button characters__button--alive"
            onClick={() => setActiveFilter('alive')}
          >
            Alive
          </button>
          <button
            className="characters__button characters__button--dead"
            onClick={() => setActiveFilter('dead')}
          >
            Dead
          </button>
          <button
            className="characters__button characters__button--unknown"
            onClick={() => setActiveFilter('unknown')}
          >
            Unknown
          </button>
        </div>
        <div className="box">
          {characters && characters.map(({
            id, name, image, status,
          }) => (
            <div
              className="card"
              key={Math.random()}
            >
              <div>
                <img src={image} alt="Character" width="300" />
              </div>
              {status === 'Alive' && <div className="status" style={{ backgroundColor: 'limegreen' }} />}
              {status === 'Dead' && <div className="status" style={{ backgroundColor: 'orangered' }} />}
              {status === 'unknown' && <div className="status" style={{ backgroundColor: 'yellow' }} />}
              <div className="card__row">
                <span className="card__title">
                  {name}
                </span>
                <button className="card__button" onClick={() => navigate(`/characters/${id}`)}>Read more</button>
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
