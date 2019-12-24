import React from 'react';
import PropType from 'prop-types';
import telephone from '../../assets/images/iconmonstr-phone-9.svg';
import User from '../../assets/images/iconmonstr-user-5.svg';
import Button from '../reusables/button';

import './request.scss';

const RideCard = ({
  name, phone, handleAcceptRide, handleDeclineRide,
}) => (
  <div className="col-5 request__card__container">
    <div className="request__card">
      <p>
        <span>
          <img src={User} alt="email" className="icon__images" />
          {' '}
        </span>
        <span>{name}</span>
      </p>
      <p>
        <span>
          <span>
            <img src={telephone} alt="telephone" className="icon__images" />
            &nbsp;
            {' '}
          </span>
        </span>
        <span className="text__container">{phone}</span>
      </p>
      <Button
        buttonClassName="accept__ride"
        buttonText="accept"
        type="submit"
        handleClick={handleAcceptRide}
      />
      <Button
        buttonClassName="decline__ride"
        buttonText="decline"
        type="submit"
        handleClick={handleDeclineRide}
      />
    </div>
  </div>
);

RideCard.propTypes = {
  name: PropType.string.isRequired,
  phone: PropType.number.isRequired,
  handleAcceptRide: PropType.func.isRequired,
  handleDeclineRide: PropType.func.isRequired,
};
export default RideCard;
