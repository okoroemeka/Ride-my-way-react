import React from 'react';
import PropTypes from 'prop-types';

const DashCard = ({
  currentLocation, destination, carType, departure, handleClick,
}) => (
  <div className="col-5 card" onClick={handleClick} onKeyDown={handleClick}>
    <div>
      <span className="info">Car: &nbsp;</span>
      {carType}
    </div>
    <div>
      <span className="info">Departure: &nbsp;</span>
      {departure}
    </div>
    <div>
      <span className="info">Destination: &nbsp;</span>
      {destination}
    </div>
    <div>
      <span className="info">Location: &nbsp;</span>
      {currentLocation}
    </div>
  </div>
);

DashCard.propTypes = {
  currentLocation: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default DashCard;
