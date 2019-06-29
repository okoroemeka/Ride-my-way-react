import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/home/Home';
import Header from './component/header/Header';
import CreateRideOffer from './component/rideOffer/CreateRideOffer';
import './styles/style.css';

class App extends Component {
  state = {
    isAuth: true,
  };

  render() {
    const { isAuth } = this.state;
    return (
      <div className="container">
        <BrowserRouter>
          {!isAuth && <Header />}
          <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/ride-offer" component={CreateRideOffer} />
              <Route path="/request" component={CreateRideOffer} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
