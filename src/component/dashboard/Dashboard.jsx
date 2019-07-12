/* eslint-disable import/no-cycle */
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { toast } from 'react-toastify';
import gql from 'graphql-tag';
import DashboardCard from './DashboardCard';
import Requets from './Requets';
import { getRideRequest } from '../../utils/queryHelpers';
import './Dashboard.scss';

const GET_RIDES = gql`
  query {
    getRidesByUserId {
      id
      currentLocation
      currentLocation
      destination
      carType
      departure
    }
  }
`;
class Dashboard extends Component {
  state = {
    request: [],
    IsRequest: false,
    rideId: '',
  };

  toggleModal = () => {
    const { IsRequest } = this.state;
    this.setState({
      IsRequest: !IsRequest,
    });
  };

  handleRespondToRideRequest = async (rideId) => {
    const { IsRequest } = this.state;
    const {
      data: { getRequestByRideId },
    } = await getRideRequest(rideId);
    this.setState(prevState => ({
      ...prevState,
      IsRequest: !IsRequest,
      rideId,
      request: getRequestByRideId,
    }));
  };

  renderRequest = () => {
    const { request: rideRequest } = this.state;
    const request = rideRequest.map(({ user: { firstname, lastname } }) => (
      <Requets passenger={`${firstname} ${lastname}`} />
    ));
    const requestsToRender = (
      <div className="row request">
        <div className="col-8 request-container">
          <div className="close-button">
            <span onClick={this.toggleModal}>&times;</span>
          </div>
          <div className="row request-container-sub">{request}</div>
        </div>
      </div>
    );
    return requestsToRender;
  };

  renderRides = ({ getRidesByUserId }) => {
    const rides = getRidesByUserId.map(
      ({
        id, currentLocation, destination, carType, departure,
      }) => (
        <DashboardCard
          currentLocation={currentLocation}
          destination={destination}
          carType={carType}
          departure={departure}
          handleClick={() => this.handleRespondToRideRequest(id)}
        />
      ),
    );
    return rides;
  };

  render() {
    const { IsRequest } = this.state;
    return (
      <Fragment>
        {IsRequest && this.renderRequest()}
        <div className="row dashboard">
          <div className="col-9 dashboard-wrap">
            <div className="row dashboard-container">
              <Query query={GET_RIDES}>
                {({ data, loading, error }) => {
                  if (error) toast.success(error.message);
                  if (loading) return <div>Loading......</div>;
                  return this.renderRides(data);
                }}
              </Query>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
