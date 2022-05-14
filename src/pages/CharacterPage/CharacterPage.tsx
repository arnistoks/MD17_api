import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './characterPage.module.scss';
import { Character } from '../../models/CharacterModel';
import Loader from '../../components/Loader/Loader';
import Prev from '../../data/prev.png';
import Next from '../../data/next.png';

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
    <section className={styles.section}>
      {loading && <Loader />}
      <div className={styles.container}>
        <button
          className={styles.next__button}
          disabled={index === '1'}
          onClick={() => {
            navigate(`/characters/${Number(index) - 1}`);
            setIndex(`${Number(index) - 1}`);
          }}
        >
          <img className="up__image" src={Prev} alt="Up" />
        </button>
        <div className={styles.card}>
          <div>
            <img className={styles.image} src={currentCharacter?.image} alt="Character" width="300" />
          </div>
          <div className={styles.card__column}>
            <div>
              <span>Name: </span>
              <span className={styles.name}>
                {currentCharacter?.name}
              </span>
            </div>
            <div>
              <span>Status: </span>
              <span className={styles.info}>
                {currentCharacter?.status}
              </span>
            </div>
            <div>
              <span>Species: </span>
              <span className={styles.info}>
                {currentCharacter?.species}
              </span>
            </div>
            <div>
              <span>Type: </span>
              <span className={styles.info}>
                {currentCharacter?.type === '' ? '-' : currentCharacter?.type}
              </span>
            </div>
            <div>
              <span>Gender: </span>
              <span className={styles.info}>
                {currentCharacter?.gender}
              </span>
            </div>
            <div>
              <span>Origin: </span>
              <span className={styles.info}>
                {currentCharacter?.origin.name}
              </span>
            </div>
            <div>
              <span>Location: </span>
              <span className={styles.info}>
                {currentCharacter?.location.name}
              </span>
            </div>
            <div>
              <span>Created: </span>
              <span className={styles.info}>
                {currentCharacter?.created}
              </span>
            </div>
          </div>
        </div>
        <button
          className={styles.next__button}
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
