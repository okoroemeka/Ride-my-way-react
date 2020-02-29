import React from 'react';
import PropType from 'prop-types';

const Card = ({ cardClassName, children }) => (
  <div className={cardClassName}>{children}</div>
);

Card.propTypes = {
  cardClassName: PropType.string.isRequired,
  children: PropType.element.isRequired,
};
export default Card;
