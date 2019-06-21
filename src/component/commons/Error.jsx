import React from 'react';
import PropTypes from 'prop-types';

import './Error.scss';

const Error = ({ error }) => (
  <div className="row">
    <div className="col-12 error">
      <p>{error}</p>
    </div>
  </div>
);
Error.propTypes = {
  error: PropTypes.string.isRequired,
};
export default Error;
