import React, { Component, Fragment } from 'react';
// eslint-disable-next-line import/no-cycle
import getRides from '../../utils/queryHelpers';
import RideCard from './RideCard';
import JoinRideForm from './JoinRideForm';
import './Rides.scss';

class Rides extends Component {
  state = {
    rides: [],
    error: '',
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

  toggleJoinRideForm = () => {
    const { isJoinRide } = this.state;
    this.setState(prevState => ({
      ...prevState,
      isJoinRide: !isJoinRide,
    }));
  };

  renderRides = (rides) => {
    const ridesToRender = !rides ? (
      <div />
    ) : (
      rides.map(({
        carImage, currentLocation, departure, destination, carType,
      }) => (
        <RideCard
          image={carImage}
          carType={carType}
          location={currentLocation}
          departure={departure}
          destination={destination}
        />
      ))
    );
    return ridesToRender;
  };

  render() {
    const { rides, isJoinRide } = this.state;
    return (
      <Fragment>
        <div className="row rides-container">{this.renderRides(rides)}</div>
        {isJoinRide && <JoinRideForm />}
      </Fragment>
    );
  }
}

export default Rides;
