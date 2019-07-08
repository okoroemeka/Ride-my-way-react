/* eslint-disable import/no-cycle */
import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './component/home/Home';
import Header from './component/header/Header';
import CreateRideOffer from './component/rideOffer/CreateRideOffer';
import Footer from './component/footer/Footer';
// eslint-disable-next-line import/no-cycle
import Ride from './component/rides/Ride';
import './styles/style.css';

class App extends Component {
  state = {
    isAuth: true,
  };

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <Fragment>
        <div className="container">
          {pathname !== '/' && <Header />}
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/ride-offer" component={CreateRideOffer} />
              <Route path="/request" component={Ride} />
            </Switch>
          </div>
        </div>
        {pathname !== '/' && <Footer />}
      </Fragment>
    );
  }
}
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
export default withRouter(App);
