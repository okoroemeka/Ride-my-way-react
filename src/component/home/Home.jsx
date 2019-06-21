import React, { Component } from 'react';
import Signup from '../signup/Signup';
import Signin from '../signin/Signin';
import './Home.scss';

class Home extends Component {
  state = {
    isLoginPage: false,
  };

  render() {
    const { isLoginPage } = this.state;
    return (
      <div className="row">
        <div className="col-6" id="banner" />
        <div className="col-6 auth-area">
          <h1>Hail a ride</h1>
          {isLoginPage ? <Signin /> : <Signup />}
        </div>
      </div>
    );
  }
}

export default Home;
