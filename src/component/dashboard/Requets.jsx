import React from 'react';
import PropTypes from 'prop-types';

const Requests = ({
  passenger, requestId, handleRideRequst, toggltModal,
}) => (
  <div className="col-4 card" onBlur={toggltModal}>
    <div>
      <span className="info">passenger: &nbsp;</span>
      {passenger}
    </div>
    <div className="buttons">
      <button
        className="buttons-accept"
        type="submit"
        onClick={() => handleRideRequst(requestId, 'accept')}
      >
        accept
      </button>
      <button
        className="buttons-reject"
        type="submit"
        onClick={() => handleRideRequst(requestId, 'reject')}
      >
        reject
      </button>
    </div>
  </div>
);

Requests.propTypes = {
  passenger: PropTypes.string.isRequired,
  requestId: PropTypes.number.isRequired,
  handleRideRequst: PropTypes.func.isRequired,
  toggltModal: PropTypes.func.isRequired,
};
export default Requests;
