import React, { useEffect, useState } from 'react';
import Button from '../reusables/button';
import './ride.scss';

const JoinRide = (props) => {
  const [pickupLocation, updateLocation] = useState('');
  const [destination, updateDestination] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      pickupLocation,
      destination
    };
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Find a ride </h3>
      <fieldset>
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
        <label htmlFor="destination">
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
        <Button
          type="submit"
          buttonText="Search"
          buttonClassName="search__ride"
        />
      </fieldset>
    </form>
  );
};

export default JoinRide;
