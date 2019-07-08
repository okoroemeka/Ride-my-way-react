import React, { Component } from 'react';
import './joinRide.scss';

class JoinRideForm extends Component {
  state = {
    pickupLocation: '',
    pickupTime: '',
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  render() {
    const { pickupLocation, pickupTime } = this.state;
    return (
      <div className="row join-ride-form">
        <div className="col-5 create-ride">
          <form method="post" onSubmit={e => this.handleSubmit(e, joinRide)}>
            <h4>Complete Request</h4>
            <fieldset>
              <label htmlFor="pickupLocation">
                Pickup Location
                <input
                  type="text"
                  name="pickupLocation"
                  value={pickupLocation}
                  placeholder="enter your current location"
                  onChange={this.onInputChange}
                />
              </label>
              <label htmlFor="destination">
                Pickup time
                <input
                  type="text"
                  name="pickupTime"
                  value={pickupTime}
                  placeholder="enter pickup Time"
                  onChange={this.onInputChange}
                />
              </label>
              <button type="submit">Complete</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default JoinRideForm;
