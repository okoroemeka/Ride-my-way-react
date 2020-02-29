/* eslint-disable import/no-cycle */
import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';
import Home from './component/home/Home';
import Header from './component/header/Header';
import CreateRideOffer from './component/rideOffer/CreateRideOffer';
// import Dashboard from './component/dashboard/Dashboard';
import DashboardV2 from './component/dashboardv2';
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
              <Route path="/dashboard" component={DashboardV2} />
            </Switch>
          </div>
          {pathname !== '/' && <Footer />}
        </div>
        <ToastContainer
          transition={Flip}
          position="bottom-right"
          autoClose={3000}
        />
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
