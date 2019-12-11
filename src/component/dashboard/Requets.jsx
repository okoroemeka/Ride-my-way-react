import React from 'react';
import PropTypes from 'prop-types';

const Requests = ({
  passenger, rideId, requestId, handleRideRequest,
}) => (
  <div className="col-4 card">
    <div>
      <span className="info">passenger: &nbsp;</span>
      {passenger}
    </div>
    <div className="buttons">
      <button
        className="buttons-accept"
        type="submit"
        onClick={() => handleRideRequest(rideId, requestId, true)}
      >
        accept
      </button>
      <button
        className="buttons-reject"
        type="submit"
        onClick={() => handleRideRequest(rideId, requestId, false)}
      >
        reject
      </button>
    </div>
  </div>
);

Requests.propTypes = {
  passenger: PropTypes.string.isRequired,
  requestId: PropTypes.number.isRequired,
  rideId: PropTypes.number.isRequired,
  handleRideRequest: PropTypes.func.isRequired,
};
export default Requests;
