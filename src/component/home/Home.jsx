import React, { Component } from 'react';
import Signup from '../signup/Signup';
import Signin from '../signin/Signin';
import './Home.scss';

class Home extends Component {
  state = {
    isLoginPage: false,
  };

  onClick = (e) => {
    const { isLoginPage } = this.state;
    e.preventDefault();
    this.setState({ isLoginPage: !isLoginPage });
  };

  render() {
    const { isLoginPage } = this.state;
    return (
      <div className="row">
        <div className="col-6" id="banner">
          <div className="overlay">
            <h1>Hail a ride</h1>
            <h3>Join our community of car pool to offer or give a ride</h3>
          </div>
        </div>
        <div className="col-6 auth-area">
          {isLoginPage ? (
            <Signin click={this.onClick} />
          ) : (
            <Signup click={this.onClick} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
