import React from 'react';
import PropType from 'prop-types';
import telephone from '../../../assets/images/iconmonstr-phone-9.svg';
import User from '../../../assets/images/iconmonstr-user-5.svg';
import Button from '../../reusables/button';

import './request.scss';

const RideCard = ({
  id,
  requestData: { user, ride },
  respondToRequest,
  handleDeclineRide,
}) => (
  <div className="col-6 request__card__container">
    <div className="request__card">
      <p>
        <span>
          <img src={User} alt="email" className="icon__images" />
          {' '}
        </span>
        <span>{`${user.firstname} ${user.lastname}`}</span>
      </p>
      <p>
        <span>
          <span>
            <img src={telephone} alt="telephone" className="icon__images" />
            &nbsp;
            {' '}
          </span>
        </span>
        <span className="text__container">{user.phone}</span>
      </p>
      <Button
        buttonClassName="accept__ride"
        buttonText="accept"
        type="submit"
        handleClick={event => respondToRequest(event, ride.id, id)}
      />
      <Button
        buttonClassName="decline__ride"
        buttonText="decline"
        type="submit"
        handleClick={event => handleDeclineRide(event, ride.id, id)}
      />
    </div>
  </div>
);

RideCard.propTypes = {
  id: PropType.number.isRequired,
  user: PropType.shape({
    id: PropType.number,
    phone: PropType.string,
    firstname: PropType.string,
    lastname: PropType.string,
  }).isRequired,
  ride: PropType.shape({ id: PropType.number }).isRequired,
  respondToRequest: PropType.func.isRequired,
  handleDeclineRide: PropType.func.isRequired,
};
export default RideCard;
