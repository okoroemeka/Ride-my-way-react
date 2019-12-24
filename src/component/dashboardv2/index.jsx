/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Button from '../reusables/button';
import RidersWrapper from './Riders';
import RidersCard from './RidersCard';
import CreateRide from './CreateRide';
import JoinRide from './JoinRide';
import RequestCard from './RequestCard';
import './dashboardv2.scss';

class Dashbaordv2 extends Component {
  state = {
    displayJoinRideForm: true,
    displayCreateRideForm: false,
    displayRideRequest: false,
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
                  <JoinRide />
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
              <RidersCard
                image="https://via.placeholder.com/150"
                name="emeka okoro"
                phone={`${982000009}`}
                destination="isLand"
                carColor="Yellow"
                carType="Toyota camry"
                location="Ojota"
              />
              <RidersCard
                image="https://via.placeholder.com/150"
                name="emeka okoro"
                phone={`${982000009}`}
                destination="isLand"
                carColor="Yellow"
                carType="Toyota camry"
                location="Ojota"
              />
            </RidersWrapper>
          </div>
        </div>
        <div className="row display__rides" />
      </>
    );
  }
}

export default Dashbaordv2;
