import React from 'react';
import PropTypes from 'prop-types';

const RideCard = (props) => {
  const {
    image, carType, departure, destination, location, joinRide,
  } = props;
  return (
    <div className="col-5 rides-sub">
      <div className="row rides">
        <div className="col-4 image">
          <img src={image} alt="carType" />
        </div>
        <div className="col-8 details">
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
            {location}
          </div>
          <button type="submit" onClick={joinRide}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

RideCard.propTypes = {
  image: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  departure: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  joinRide: PropTypes.func.isRequired,
};

export default RideCard;
