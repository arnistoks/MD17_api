import '../data/styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../models/CharacterModel';
import Loader from '../components/Loader';
import Prev from '../data/prev.png';
import Next from '../data/next.png';

const CharacterPage = () => {
  const [currentCharacter, setCurrentCharacter] = useState<Character>();
  const { id } = useParams();
  const [index, setIndex] = useState<string | undefined>(id);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${index}`);
      setCurrentCharacter(response.data);
    } catch (error) {
      navigate('/characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacter().then();
  }, [index]);

  return (
    <section className="section">
      {loading && <Loader />}
      <div className="container charactersPage__container">
        <button
          className="next__button"
          disabled={index === '1'}
          onClick={() => {
            navigate(`/characters/${Number(index) - 1}`);
            setIndex(`${Number(index) - 1}`);
          }}
        >
          <img className="up__image" src={Prev} alt="Up" />
        </button>
        <div className="card card__current">
          <div>
            <img className="image" src={currentCharacter?.image} alt="Charachter" width="300" />
          </div>
          <div className="card__column">
            <div>
              <span>Name: </span>
              <span className="name">
                {currentCharacter?.name}
              </span>
            </div>
            <div>
              <span>Status: </span>
              <span className="info">
                {currentCharacter?.status}
              </span>
            </div>
            <div>
              <span>Species: </span>
              <span className="info">
                {currentCharacter?.species}
              </span>
            </div>
            <div>
              <span>Type: </span>
              <span className="info">
                {currentCharacter?.type === '' ? '-' : currentCharacter?.type}
              </span>
            </div>
            <div>
              <span>Gender: </span>
              <span className="info">
                {currentCharacter?.gender}
              </span>
            </div>
            <div>
              <span>Origin: </span>
              <span className="info">
                {currentCharacter?.origin.name}
              </span>
            </div>
            <div>
              <span>Location: </span>
              <span className="info">
                {currentCharacter?.location.name}
              </span>
            </div>
            <div>
              <span>Created: </span>
              <span className="info">
                {currentCharacter?.created}
              </span>
            </div>
          </div>
        </div>
        <button
          className="next__button"
          disabled={index === '826'}
          onClick={() => {
            navigate(`/characters/${Number(index) + 1}`);
            setIndex(`${Number(index) + 1}`);
          }}
        >
          <img className="up__image" src={Next} alt="Up" />
        </button>
      </div>
    </section>
  );
};

export default CharacterPage;
