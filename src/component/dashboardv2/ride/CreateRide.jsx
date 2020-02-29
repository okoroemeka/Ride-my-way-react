import React, { useReducer, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '../../reusables/button';
import './ride.scss';

const FORM_ACTION = 'FORM_ACTION';
const CLEAR_FORM = 'CLEAR_FORM';

const formRducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTION:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      };
    case CLEAR_FORM:
      return {
        pickup: '',
        destination: '',
        capacity: 0,
        carType: '',
        carColor: '',
        departure: '',
        timeOfDay: 'AM',
        plateNumber: '',
      };
    default:
      return state;
  }
};
const CREATE_RIDE = gql`
  mutation createRide($input: NewRideInput!) {
    createRide(input: $input) {
      userId
      carType
      capacity
      carColor
      id
    }
  }
`;
const CreateRide = () => {
  const [formState, dispatchFormState] = useReducer(formRducer, {
    pickup: '',
    destination: '',
    capacity: 0,
    carType: '',
    carColor: '',
    departure: '',
    timeOfDay: 'AM',
    plateNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [createRide] = useMutation(CREATE_RIDE);
  // const [toggleState, onToggle] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...formState,
      capacity: Number(formState.capacity),
      departure: `${formState.departure}${formState.timeOfDay}`,
    };
    delete formData.timeOfDay;
    setLoading(true);
    await createRide({ variables: { input: formData } });
    setLoading(false);
    dispatchFormState({ type: CLEAR_FORM });
    toast.success('Ride created successfully.');
  };
  const handleChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatchFormState({
        type: FORM_ACTION,
        inputName: name,
        inputValue: value,
      });
    },
    [dispatchFormState],
  );

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create ride</h3>
      <fieldset disabled={loading}>
        <label htmlFor="currentLocation">
          Pickup Location
          <input
            type="text"
            name="pickup"
            value={formState.pickupLocation}
            placeholder="enter pickup location"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="destination">
          Destination
          <input
            type="text"
            name="destination"
            value={formState.destination}
            placeholder="enter destination"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            name="capacity"
            value={formState.capacity}
            placeholder="enter car capacity"
            onChange={handleChange}
            required
            min="1"
          />
        </label>
        <label htmlFor="carType">
          Car type
          <input
            type="text"
            name="carType"
            value={formState.carType}
            placeholder="enter car Type"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="carColor">
          Car color
          <input
            type="text"
            name="carColor"
            value={formState.carColor}
            placeholder="enter car color"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="departure">
          Departure time
          <input
            className="departure__time"
            type="time"
            name="departure"
            value={formState.departure}
            placeholder="enter departure time"
            onChange={handleChange}
            required
          />
          <select
            name="timeOfDay"
            value={formState.timeOfDay}
            onChange={handleChange}
            className="time__of__day"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
        <label htmlFor="plateNumber">
          Plate number
          <input
            type="text"
            name="plateNumber"
            value={formState.plateNumber}
            placeholder="enter car plate number"
            onChange={handleChange}
            required
          />
        </label>
        <Button
          type="submit"
          buttonText="Create"
          buttonClassName="create__ride"
          disabled={loading}
        />
      </fieldset>
    </form>
  );
};

export default CreateRide;
