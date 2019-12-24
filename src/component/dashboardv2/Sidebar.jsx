import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ children }) => <div className="side__bar">{children}</div>;

SideBar.defaultProps = {
  children: [],
};
SideBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.object)
  ])
};
export default SideBar;
