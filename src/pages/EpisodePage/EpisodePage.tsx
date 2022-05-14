import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './episodePage.module.scss';
import { Episode } from '../../models/EpisodesModel';
import Loader from '../../components/Loader/Loader';
import Prev from '../../data/prev.png';
import Next from '../../data/next.png';

const EpisodePage = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode>();
  const { id } = useParams();
  const [index, setIndex] = useState<string | undefined>(id);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${index}`);
      setCurrentEpisode(response.data);
    } catch (error) {
      navigate('/episodes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisode().then();
  }, [index]);

  return (
    <section className={styles.section}>
      {loading && <Loader />}
      <div className={styles.container}>
        <button
          className={styles.next__button}
          disabled={index === '1'}
          onClick={() => {
            navigate(`/episodes/${Number(index) - 1}`);
            setIndex(`${Number(index) - 1}`);
          }}
        >
          <img className="up__image" src={Prev} alt="Up" />
        </button>
        <div className={styles.card}>
          <div className={styles.card__column}>
            <div>
              <span>Name: </span>
              <span className={styles.name}>
                {currentEpisode?.name}
              </span>
            </div>
            <div>
              <span>Air Date: </span>
              <span className={styles.info}>
                {currentEpisode?.air_date}
              </span>
            </div>
            <div>
              <span>Episode: </span>
              <span className={styles.info}>
                {currentEpisode?.episode}
              </span>
            </div>
            <div>
              <span>Created: </span>
              <span className={styles.info}>
                {currentEpisode?.created}
              </span>
            </div>
          </div>
        </div>
        <button
          className={styles.next__button}
          disabled={index === '51'}
          onClick={() => {
            navigate(`/episodes/${Number(index) + 1}`);
            setIndex(`${Number(index) + 1}`);
          }}
        >
          <img className="up__image" src={Next} alt="Up" />
        </button>
      </div>
    </section>
  );
};

export default EpisodePage;
