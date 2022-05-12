import React, { useEffect, useState } from 'react';
import '../data/styles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Location } from '../models/LocationModel';
import Loader from '../components/Loader';
import Prev from '../data/prev.png';
import Next from '../data/next.png';

const LocationPage = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const { id } = useParams();
  const [index, setIndex] = useState<string | undefined>(id);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getLocation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${index}`);
      setCurrentLocation(response.data);
    } catch (error) {
      navigate('/locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation().then();
  }, [index]);

  return (
    <section className="section">
      {loading && <Loader />}
      <div className="container charactersPage__container">
        <button
          className="next__button"
          disabled={index === '1'}
          onClick={() => {
            navigate(`/locations/${Number(index) - 1}`);
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
                {currentLocation?.name}
              </span>
            </div>
            <div>
              <span>Type: </span>
              <span className="info">
                {currentLocation?.type}
              </span>
            </div>
            <div>
              <span>Dimension: </span>
              <span className="info">
                {currentLocation?.dimension}
              </span>
            </div>
            <div>
              <span>Created: </span>
              <span className="info">
                {currentLocation?.created}
              </span>
            </div>
          </div>
        </div>
        <button
          className="next__button"
          disabled={index === '126'}
          onClick={() => {
            navigate(`/locations/${Number(index) + 1}`);
            setIndex(`${Number(index) + 1}`);
          }}
        >
          <img className="up__image" src={Next} alt="Up" />
        </button>
      </div>
    </section>
  );
};

export default LocationPage;
