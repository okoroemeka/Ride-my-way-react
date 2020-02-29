/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import Button from '../reusables/button';
import RidersWrapper from './ride/Riders';
import RidersCard from './ride/RidersCard';
import CreateRide from './ride/CreateRide';
import JoinRide from './ride/JoinRide';
import RequestCard from './request/RequestCard';
import RequestWrapper from './request/RequestWrapper';
import { joinRides, respondToRideRequest } from '../../utils/queryHelpers';
import Modal from '../reusables/Modal';
import Card from '../reusables/Card';
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
    showWarningModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      showWarningModal: !prevState.showWarningModal,
    }));
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

  handleCancelDecline = () => {
    this.toggleModal();
  };

  handleDeclineRide = (e, rideId, requestId) => {
    this.setState({ e, rideId, requestId });
    this.toggleModal();
  }

  handleRespondToRequest = async (event, rideId, requestId) => {
    const { innerText } = event.target;
    const approved = innerText === 'accept';
    const { showWarningModal } = this.state;

    try {
      await respondToRideRequest(rideId, requestId, approved);
      toast.success(`You successfully ${approved ? 'acceptted' : 'rejected'} this ride.`);
      if (showWarningModal) {
        this.toggleModal();
      }
    } catch (error) {
      toast.error('An error occured.');
    }
  };

  /**
   * handle join ride
   * @param {string}
   * @returns {null}
   */
  joinRideHandler = async (rideId) => {
    try {
      this.setState(prevState => ({
        isJoinRideLoading: !prevState.isJoinRideLoading,
      }));
      await joinRides(rideId);
      toast.success('joined succesfully');
      this.setState(prevState => ({
        isJoinRideLoading: !prevState.isJoinRideLoading,
      }));
    } catch (error) {
      toast.error(error.message.split(':')[1]);
    }
  };

  /**
   * update state with available rides
   */
  updateAvailableRide = (data) => {
    this.setState({
      availableRide: data,
    });
  };

  renderRideComponents = (
    displayJoinRideForm,
    displayCreateRideForm,
    displayRideRequest,
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
      showWarningModal,
      e: event, rideId, requestId,
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
              <RequestWrapper>
                {(data, loading, error) => {
                  if (error) {
                    return (
                      <p>
                        An error occured while trying to get ride requests,
                        please try again
                      </p>
                    );
                  }
                  if (loading) {
                    return <p>Loading...</p>;
                  }
                  const view = !data.length ? (
                    <h5>There is no ride request yet</h5>
                  ) : (
                    data.map(request => (
                      <RequestCard
                        id={request.id}
                        requestData={request}
                        handleDeclineRide={this.handleDeclineRide}
                        respondToRequest={this.handleRespondToRequest}
                      />
                    ))
                  );
                  return view;
                }}
              </RequestWrapper>
            )}
          </div>
          <div className="col-3 display__rides__container">
            <RidersWrapper>
              {availableRide.map(data => (
                <RidersCard
                  {...data}
                  handleClick={this.joinRideHandler}
                  loading={isJoinRideLoading}
                />
              ))}
            </RidersWrapper>
          </div>
          {showWarningModal && (
            <Modal>
              <Card cardClassName="warningCard">
                <h3>Decline request?</h3>
                <Button
                  buttonClassName="cancel"
                  type="submit"
                  buttonText="Cancel"
                  handleClick={this.toggleModal}
                />
                <Button
                  buttonClassName="decline"
                  type="submit"
                  buttonText="Complete"
                  handleClick={() => this.handleRespondToRequest(event, rideId, requestId)}
                />
              </Card>
            </Modal>
          )}
        </div>
        <div className="row display__rides" />
      </>
    );
  }
}

export default Dashbaordv2;
