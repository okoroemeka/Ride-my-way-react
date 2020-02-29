import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../reusables/button';
import UserImage from '../../../assets/images/iconmonstr-user-5.svg';
import phoneIcone from '../../../assets/images/iconmonstr-phone-9.svg';
import carIcon from '../../../assets/images/iconmonstr-car-1.svg';
import busStandIcon from '../../../assets/images/iconmonstr-bus-8.svg';

const Card = ({
  id,
  image,
  destination,
  carType,
  handleClick,
  user,
  loading,
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
        {`${user.firstname} ${user.lastname}`}
      </div>
      <div>
        <span className="details">
          <img src={phoneIcone} alt="telephone" className="icon__image" />
        </span>
        &nbsp;
        {user.phone}
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
        {destination}
      </div>
      <Button
        buttonText="join"
        buttonClassName="join__ride"
        handleClick={() => handleClick(id)}
        disabled={loading}
      />
    </div>
  </div>
);
Card.propTypes = {
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  destination: PropTypes.string.isRequired,
  carType: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Card;
