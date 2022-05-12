import React, { useEffect, useState } from 'react';
import '../data/styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Episode } from '../models/EpisodesModel';
import Loader from '../components/Loader';
import Prev from '../data/prev.png';
import Next from '../data/next.png';

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
    <section className="section">
      {loading && <Loader />}
      <div className="container charactersPage__container">
        <button
          className="next__button"
          disabled={index === '1'}
          onClick={() => {
            navigate(`/episodes/${Number(index) - 1}`);
            setIndex(`${Number(index) - 1}`);
          }}
        >
          <img className="up__image" src={Prev} alt="Up" />
        </button>
        <div className="card card__current">
          <div className="card__column">
            <div>
              <span>Name: </span>
              <span className="name">
                {currentEpisode?.name}
              </span>
            </div>
            <div>
              <span>Air Date: </span>
              <span className="info">
                {currentEpisode?.air_date}
              </span>
            </div>
            <div>
              <span>Episode: </span>
              <span className="info">
                {currentEpisode?.episode}
              </span>
            </div>
            <div>
              <span>Created: </span>
              <span className="info">
                {currentEpisode?.created}
              </span>
            </div>
          </div>
        </div>
        <button
          className="next__button"
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
