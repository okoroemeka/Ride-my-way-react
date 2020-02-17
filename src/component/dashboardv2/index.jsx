/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Button from '../reusables/button';
import RidersWrapper from './Riders';
import RidersCard from './RidersCard';
import CreateRide from './CreateRide';
import JoinRide from './JoinRide';
import RequestCard from './RequestCard';
import { joinRides } from '../../utils/queryHelpers';
import './dashboardv2.scss';

class Dashbaordv2 extends Component {
  state = {
    displayJoinRideForm: true,
    displayCreateRideForm: false,
    displayRideRequest: false,
    availableRide: [
      {
        image: 'https://via.placeholder.com/150',
        user: { firstname: 'emeka', lastname: 'okoro', phone: `${982000009}` },
        destination: 'isLand',
        carColor: 'Yellow',
        carType: 'Toyota camry',
        location: 'Ojota',
      },
    ],
    isJoinRideLoading: false,
    // joinRideError: '',
  };

  toggleJoinRideForm = () => {
    this.setState({
      displayJoinRideForm: true,
      displayCreateRideForm: false,
      displayRideRequest: false,
    });
  };

  toggleCreateRideForm = () => {
    this.setState({
      displayJoinRideForm: false,
      displayCreateRideForm: true,
      displayRideRequest: false,
    });
  };

  toggleRideRequest = () => {
    this.setState({
      displayJoinRideForm: false,
      displayCreateRideForm: false,
      displayRideRequest: true,
    });
  };

  joinRideHandler = async (rideId) => {
    try {
      this.setState(prevState => ({ isJoinRideLoading: !prevState.isJoinRideLoading }));
      await joinRides(rideId);
      this.setState(prevState => ({ isJoinRideLoading: !prevState.isJoinRideLoading }));
    } catch (error) {
      toast.error(error.message.split(':')[1]);
    }
  };

  updateAvailableRide = (data) => {
    this.setState({
      availableRide: data,
    });
  };

  renderRideComponents = (
    displayJoinRideForm,
    displayCreateRideForm,
    displayRideRequest,
    ...rest
  ) => {
    if (displayRideRequest) {
      return <span />;
    }
    if (displayJoinRideForm && !displayCreateRideForm) {
      return <JoinRide />;
    }
    return <CreateRide />;
  };

  render() {
    const {
      displayJoinRideForm,
      displayCreateRideForm,
      displayRideRequest,
      availableRide,
      isJoinRideLoading,
    } = this.state;
    return (
      <>
        <div className="row main__body">
          <div className="col-2 side__bar__container">
            <Sidebar>
              <Button
                buttonClassName="create__ride__button"
                buttonText="create ride"
                type="button"
                handleClick={this.toggleCreateRideForm}
              />
              <Button
                buttonClassName="join__ride__button"
                buttonText="join ride"
                type="button"
                handleClick={this.toggleJoinRideForm}
              />
              <Button
                buttonClassName="ride__requests"
                buttonText="requests"
                type="button"
                handleClick={this.toggleRideRequest}
              />
            </Sidebar>
          </div>
          <div className="col-7 main__area__coantainer">
            {!displayRideRequest ? (
              <div className="ride__form">
                {displayJoinRideForm && !displayCreateRideForm ? (
                  <JoinRide getRides={this.updateAvailableRide} />
                ) : (
                  <CreateRide />
                )}
              </div>
            ) : (
              <>
                <RequestCard name="emeka" phone={9087676543} />
                <RequestCard name="emeka" phone={9087676543} />
              </>
            )}
          </div>
          <div className="col-3 display__rides__container">
            <RidersWrapper>
              {availableRide.map(data => (
                <RidersCard {...data} handleClick={this.joinRideHandler} loading={isJoinRideLoading} />
              ))}
            </RidersWrapper>
          </div>
        </div>
        <div className="row display__rides" />
      </>
    );
  }
}

export default Dashbaordv2;
