import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <div className="row header-container">
    <div className="col-2 header-name">
      <h3>Ride-with-me</h3>
    </div>
    <div className="col-10 pages">
      <NavLink to="/ride-offer" className="nav-items">
        Ride
      </NavLink>
      <NavLink to="/dashboard" className="nav-items">
        Profile
      </NavLink>
    </div>
  </div>
);

export default Header;
