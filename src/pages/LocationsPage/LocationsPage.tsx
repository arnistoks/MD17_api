import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './locationsPage.module.scss';
import { Location } from '../../models/LocationModel';
import Loader from '../../components/Loader/Loader';

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [findLocation, setFindLocation] = useState('');
  const navigate = useNavigate();

  const getLocations = async () => {
    setLoading(true);
    const search = `?name=${inputValue}`;
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${search}`);
      setLocations(response.data.results);
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
    getLocations().then();
    setInputValue('');
  }, [findLocation]);

  return (
    <section className={styles.section}>
      {loading && <Loader />}
      <div className={styles.container}>
        <h1 className={styles.title}>Locations</h1>
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
            placeholder="Search by location name"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <button
            type="submit"
            className={styles.search__button}
            onClick={() => setFindLocation(inputValue)}
          >
            Search
          </button>
        </form>
        <div className={styles.box}>
          {locations && locations.map(({
            id, name, type, dimension,
          }) => (
            <div
              className={styles.card}
              key={Math.random()}
            >
              <div>
                <div>
                  <span>Name: </span>
                  <span className={styles.name}>{name}</span>
                </div>
                <div>
                  <span>Type: </span>
                  <span className={styles.info}>{type}</span>
                </div>
                <div>
                  <span>Dimension: </span>
                  <span className={styles.info}>{dimension}</span>
                </div>
              </div>
              <div className={styles.card__row}>
                <button className={styles.card__button} onClick={() => navigate(`/locations/${id}`)}>Read more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default LocationsPage;
