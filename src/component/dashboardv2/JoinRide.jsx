/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
// import Button from '../reusables/button';
import useDebounce from '../hooks/Debounce';
import { getRides } from '../../utils/queryHelpers';
import Error from '../commons/Error';
import './ride.scss';

const JOINRIDE_RIDE = gql`
  query getRides($input: GetRidesInput!) {
    getRides(input: $input) {
      id
      pickup
      destination
      departure
      capacity
      carColor
      carType
      plateNumber
      userId
      user {
        id
        firstname
        lastname
        phone
      }
    }
  }
`;
const JoinRide = (props) => {
  const [pickupLocation, updateLocation] = useState('');
  const [destination, updateDestination] = useState('');
  const [error, setError] = useState('');
  // const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(destination, 3000);
  useEffect(() => {
    if (debouncedSearchTerm) {
      if (!pickupLocation.length) {
        setError('provide pickup location');
      } else {
        setError('');
        getRides(JOINRIDE_RIDE, {
          pickup: pickupLocation,
          destination,
        })
          .then((result) => {
            props.getRides(result.data.getRides);
          })
          .catch((err) => {
            setError(err.message);
          });
      }
    }
  }, [debouncedSearchTerm]);

  return (
    <form>
      <h3>Find a ride </h3>
      {Boolean(error.length) && <Error error={error} />}
      <fieldset>
        <label htmlFor="Pickup">
          Pickup Location
          <input
            type="text"
            name="destination"
            value={pickupLocation}
            placeholder="enter destination"
            onChange={e => updateLocation(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label htmlFor="destination">
          Destination
          <input
            type="text"
            name="destination"
            value={destination}
            placeholder="enter destination"
            onChange={e => updateDestination(e.target.value)}
            autoComplete="off"
          />
        </label>
      </fieldset>
    </form>
  );
};

export default JoinRide;
