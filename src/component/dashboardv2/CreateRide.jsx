import React, { useEffect, useState } from 'react';
import Button from '../reusables/button';
import './ride.scss';
// import { Link } from 'react-router-dom';

const CreateRide = () => {
  const [pickupLocation, updateLocation] = useState('');
  const [destination, updateDestination] = useState('');
  const [capacity, updateCapacity] = useState(0);
  const [carType, updateCarType] = useState('');
  const [carColor, updateCarColor] = useState('');
  const [departure, updateDeparture] = useState('');
  const [plateNumber, updatePlateNumber] = useState('');
  // const [toggleState, onToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await createRide();
    // toast.success('Ride created successfully.');
    const data = {
      pickupLocation,
      destination,
      capacity,
      carColor,
      carType,
      departure,
      plateNumber,
    };
    // history.push('/dashboard');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Create ride</h3>
      <fieldset>
        <label htmlFor="currentLocation">
          pickup location
          <input
            type="text"
            name="currentLocation"
            value={pickupLocation}
            placeholder="enter your current location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="destination">
          destination
          <input
            type="text"
            name="destination"
            value={destination}
            placeholder="enter destination"
            onChange={e => updateDestination(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label htmlFor="capacity">
          capacity
          <input
            type="number"
            name="capacity"
            value={capacity}
            placeholder="enter car capacity"
            onChange={e => updateCapacity(e.target.value)}
          />
        </label>
        <label htmlFor="carType">
          car type
          <input
            type="text"
            name="carType"
            value={carType}
            placeholder="enter car Type"
            onChange={e => updateCarType(e.target.value)}
          />
        </label>
        <label htmlFor="carColor">
          car color
          <input
            type="text"
            name="carColor"
            value={carColor}
            placeholder="enter car color"
            onChange={e => updateCarColor(e.target.value)}
          />
        </label>
        <label htmlFor="departure">
          departure time
          <input
            className="departure__time"
            type="time"
            name="departure"
            value={departure}
            placeholder="enter departure time"
            onChange={e => updateDeparture(e.target.value)}
          />
        </label>
        <label htmlFor="plateNumber">
          plate number
          <input
            type="text"
            name="plateNumber"
            value={plateNumber}
            placeholder="enter car plate number"
            onChange={e => updatePlateNumber(e.target.value)}
          />
        </label>
        <Button
          type="submit"
          handleClick={handleSubmit}
          buttonText="Create"
          buttonClassName="create__ride"
        />
      </fieldset>
    </form>
  );
};

export default CreateRide;
