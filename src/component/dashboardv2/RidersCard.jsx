import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  image, name, phone, destination, location,
}) => (
  <div className="card__container">
    <div className="image__area">
      <div className="image__container">
        <img src={image} alt="user" className="image" />
      </div>
    </div>
    <div className="details__area">
      <div>
        <span className="details">name:</span>
        &nbsp;
        {' '}
        {name}
      </div>
      <div>
        <span className="details">phone:</span>
        &nbsp;
        {phone}
      </div>
      <div>
        <span className="details">destination:</span>
        &nbsp;
        {' '}
        {destination}
      </div>
      <div>
        <span className="details">pick up:</span>
        &nbsp;
        {' '}
        {location}
      </div>
    </div>
  </div>
);
Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default Card;
