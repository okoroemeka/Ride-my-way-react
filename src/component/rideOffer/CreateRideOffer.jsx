import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './CreateRide.scss';
import JoinRide from './JoinRide';
import CreateRideOffer from './CreateRide';

class Ride extends Component {
  state = {
    isCreateRide: true,
  };

  toggle = (e) => {
    e.preventDefault();
    const { isCreateRide } = this.state;
    this.setState({
      isCreateRide: !isCreateRide,
    });
  };

  render() {
    const { isCreateRide } = this.state;
    return (
      <div className="row ride-offer">
        {isCreateRide ? (
          <CreateRideOffer toggleForm={this.toggle} />
        ) : (
          <JoinRide toggleForm={this.toggle} />
        )}
      </div>
    );
  }
}

export default withRouter(Ride);
