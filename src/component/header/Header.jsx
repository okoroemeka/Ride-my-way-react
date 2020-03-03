import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../logout/Logout';
import User from '../user/User';
import './header.scss';

const Header = () => (
  <div className="row header-container">
    <div className="col-2 header-name">
      <NavLink to="/" className="home-nav">
        <h3>Move</h3>
      </NavLink>
    </div>
    <div className="col-10 pages">
      <User>
        {({ getUser }) => {
          let componentToRender;
          if (getUser) {
            componentToRender = <Logout />;
          } else {
            componentToRender = (
              <Fragment>
                <NavLink to="/" className="nav-items">
              Sign up
                </NavLink>
              </Fragment>
            );
          }
          return componentToRender;
        }}
      </User>

      {/* <NavLink to="/logout" className="nav-items">
        Log Out
      </NavLink> */}
      {/* <NavLink to="/dashboard" className="nav-items">
        Profile
      </NavLink> */}
    </div>
  </div>
);

export default Header;
