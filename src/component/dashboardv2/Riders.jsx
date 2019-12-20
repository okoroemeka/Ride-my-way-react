import React from 'react';
import PropTypes from 'prop-types';


const Riders = ({ children }) => <div className="display__riders__card">{children}</div>;

Riders.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Riders;
