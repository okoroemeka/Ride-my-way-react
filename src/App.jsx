import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './component/home/Home';
import Header from './component/header/Header';
import CreateRideOffer from './component/rideOffer/CreateRideOffer';
import Footer from './component/footer/Footer';
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
              <Route path="/request" component={CreateRideOffer} />
            </Switch>
          </div>
          {pathname !== '/' && <Footer />}
        </div>
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
