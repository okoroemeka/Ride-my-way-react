import React from 'react';
import PropTypes from 'prop-types';

const SideBar = ({ children }) => <div className="side__bar">{children}</div>;

SideBar.propTypes = {
  children: PropTypes.element.isRequired,
};
export default SideBar;
