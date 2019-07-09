import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { getRides, joinRides } from '../../utils/queryHelpers';
import RideCard from './RideCard';
import './Rides.scss';

class Rides extends Component {
  state = {
    rides: [],
    message: '',
    error: [],
    isJoinRide: false,
  };

  async componentDidMount() {
    const {
      data: { getSomeRides },
    } = await getRides(JSON.parse(sessionStorage.getItem('ridesParams')));
    if (!getSomeRides) {
      return this.setState(prevState => ({
        ...prevState,
        error: 'error occured',
      }));
    }
    return this.setState(prevState => ({
      ...prevState,
      rides: getSomeRides,
    }));
  }

  handleJoinRide = async (rideId) => {
    try {
      const {
        data: {
          rideRequest: { text },
        },
      } = await joinRides(rideId);
      const { history } = this.props;
      sessionStorage.removeItem('ridesParams');
      toast.success(text);
      return history.push('/dashboard');
    } catch (error) {
      const { error: stateError } = this.state;
      return this.setState({
        error: [...stateError, error.message],
      });
    }
  };

  renderRides = (rides) => {
    const ridesToRender = !rides ? (
      <div />
    ) : (
      rides.map(({
        id, carImage, currentLocation, departure, destination, carType,
      }) => (
        <RideCard
          rideId={id}
          image={carImage}
          carType={carType}
          location={currentLocation}
          departure={departure}
          destination={destination}
          joinRide={this.handleJoinRide}
        />
      ))
    );
    return ridesToRender;
  };

  render() {
    const { rides } = this.state;
    return (
      <Fragment>
        <div className="row rides-container">{this.renderRides(rides)}</div>
      </Fragment>
    );
  }
}
Rides.propTypes = {
  history: PropTypes.oneOfType(PropTypes.array).isRequired,
};

export default withRouter(Rides);
