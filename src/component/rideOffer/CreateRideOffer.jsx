import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import axios from 'axios';
import './CreateRide.scss';
import Error from '../commons/Error';

const CREATE_RIDE = gql`
  mutation createRide(
    $currentLocation: String!
    $destination: String!
    $capacity: Int!
    $carColor: String!
    $carType: String!
    $departure: String!
    $image: String!
    $plateNumber: String!
  ) {
    createRide(
      currentLocation: $currentLocation
      destination: $destination
      capacity: $capacity
      carColor: $carColor
      carImage: $image
      carType: $carType
      departure: $departure
      plateNumber: $plateNumber
    ) {
      destination
    }
  }
`;
class CreateRide extends Component {
  state = {
    currentLocation: '',
    destination: '',
    capacity: '',
    carColor: '',
    carType: '',
    departure: '',
    image: '',
    plateNumber: '',
  };

  uploadFile = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const { data: newdata } = await axios.post(
      'https://api.cloudinary.com/v1_1/dejndvrjd/image/upload',
      data,
    );
    this.setState({
      image: newdata.secure_url,
    });
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, createRide) => {
    const { history } = this.props;
    e.preventDefault();
    await createRide();
    this.setState({
      currentLocation: '',
      destination: '',
      capacity: '',
      carColor: '',
      carType: '',
      departure: '',
      image: '',
      plateNumber: '',
    });
    history.push('/request');
  };

  render() {
    const {
      currentLocation,
      destination,
      capacity,
      carColor,
      carType,
      departure,
      image,
      plateNumber,
    } = this.state;
    return (
      <Mutation
        mutation={CREATE_RIDE}
        variables={{ ...this.state, capacity: parseInt(capacity, 10) }}
      >
        {(createRide, { loading, error }) => (
          <div className="row ride-offer">
            <div className="col-6 join-ride-container">
              <div className="ride-offer-overlay">
                <Link to="/ride-requests" className="join-ride">
                  Join a Ride
                </Link>
              </div>
            </div>
            <div className="col-6 create-ride-container">
              <div className="create-ride">
                <form method="post" onSubmit={e => this.handleSubmit(e, createRide)}>
                  <h4>Create Ride</h4>
                  {error && <Error error={error.message} />}
                  <fieldset disabled={loading}>
                    <label htmlFor="car-image">
                      Car Image
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="upload an image"
                        required
                        onChange={this.uploadFile}
                      />
                    </label>
                    {image && <img src={image} alt={carType} />}
                    <label htmlFor="currentLocation">
                      Current Location
                      <input
                        type="text"
                        name="currentLocation"
                        value={currentLocation}
                        placeholder="enter your current location"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="destination">
                      destination
                      <input
                        type="text"
                        name="destination"
                        value={destination}
                        placeholder="enter destination"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="capacity">
                      capacity
                      <input
                        type="number"
                        name="capacity"
                        value={capacity}
                        placeholder="enter car capacity"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="carType">
                      Car Type
                      <input
                        type="text"
                        name="carType"
                        value={carType}
                        placeholder="enter car Type"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="carColor">
                      Car Color
                      <input
                        type="text"
                        name="carColor"
                        value={carColor}
                        placeholder="enter car color"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="departure">
                      departure
                      <input
                        type="text"
                        name="departure"
                        value={departure}
                        placeholder="enter departure time"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <label htmlFor="plateNumber">
                      plateNumber
                      <input
                        type="text"
                        name="plateNumber"
                        value={plateNumber}
                        placeholder="enter car plate number"
                        onChange={this.onInputChange}
                      />
                    </label>
                    <button type="submit">Create Ride</button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CreateRide);
