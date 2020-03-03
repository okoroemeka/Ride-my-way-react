/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  buttonClassName,
  buttonText,
  type,
  handleClick,
  disabled,
}) => (
  <button
    className={buttonClassName}
    type={type}
    onClick={handleClick}
    disabled={disabled}
  >
    {buttonText}
  </button>
);

Button.defaultProps = {
  buttonClassName: '',
  handleClick: () => null,
  disabled: false,
};
Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Button;
