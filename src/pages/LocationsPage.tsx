import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Location } from '../models/LocationModel';
import Loader from '../components/Loader';

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
  }, [findLocation]);

  useEffect(() => {
    setInputValue('');
  }, [findLocation]);

  return (
    <section className="section">
      {loading && <Loader />}
      <div className="container">
        <h1 className="title">Locations</h1>
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
            placeholder="Search by location name"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <button type="submit" className="search__button" onClick={() => setFindLocation(inputValue)}>Search</button>
        </form>
        <div className="box">
          {locations && locations.map(({
            id, name, type, dimension,
          }) => (
            <div
              className="card"
              key={Math.random()}
            >
              <div>
                <span>Name: </span>
                <span className="name">{name}</span>
              </div>
              <div>
                <span>Type: </span>
                <span className="info">{type}</span>
              </div>
              <div>
                <span>Dimension: </span>
                <span className="info">{dimension}</span>
              </div>
              <button className="card__button" onClick={() => navigate(`/locations/${id}`)}>Read more</button>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
};

export default LocationsPage;
