import React from 'react';
import PropTypes from 'prop-types';
import Button from '../reusables/button';
import UserImage from '../../assets/images/iconmonstr-user-5.svg';
import phoneIcone from '../../assets/images/iconmonstr-phone-9.svg';
import carIcon from '../../assets/images/iconmonstr-car-1.svg';
import busStandIcon from '../../assets/images/iconmonstr-bus-8.svg';

const Card = ({
  image, name, phone, location, carType, handleClick,
}) => (
  <div className="card__container">
    <div className="image__area">
      <div className="image__container">
        <img src={image} alt="user" className="image" />
      </div>
    </div>
    <div className="details__area">
      <div>
        <span className="details">
          <img src={UserImage} alt="user" className="icon__image" />
        </span>
        &nbsp;
        {' '}
        {name}
      </div>
      <div>
        <span className="details">
          <img src={phoneIcone} alt="telephone" className="icon__image" />
        </span>
        &nbsp;
        {phone}
      </div>
      <div>
        <span className="details">
          <img src={carIcon} alt="vehicle" className="icon__image" />
        </span>
        &nbsp;
        {' '}
        {carType}
      </div>
      <div>
        <span className="details">
          <img src={busStandIcon} alt="bus stand" className="icon__image" />
        </span>
        &nbsp;
        {' '}
        {location}
      </div>
      <Button
        buttonText="join"
        buttonClassName="join__ride"
        handleClick={handleClick}
      />
    </div>
  </div>
);
Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Card;
