/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
 buttonClassName, buttonText, type, handleClick 
}) => (
  <button className={buttonClassName} type={type} onClick={handleClick}>
    {buttonText}
  </button>
);

Button.defaultProps = {
  buttonClassName: '',
  handleClick: () => null,
};
Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
export default Button;
