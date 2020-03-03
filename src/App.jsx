/* eslint-disable import/no-cycle */
import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.min.css';
import Home from './component/home/Home';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Dashboard from './Pages/Dashboard';
// eslint-disable-next-line import/no-cycle
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
              <Route path="/dashboard" component={Dashboard} />
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
