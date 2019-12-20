import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import axios from 'axios';
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
    toast.success('Ride created successfully.');
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
    history.push('/dashboard');
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
    const { toggleForm } = this.props;
    return (
      <Mutation
        mutation={CREATE_RIDE}
        variables={{ ...this.state, capacity: parseInt(capacity, 10) }}
      >
        {(createRide, { loading, error }) => (
          <div className="col-5 create-ride-container">
            <div className="create-ride">
              <form
                method="post"
                onSubmit={e => this.handleSubmit(e, createRide)}
              >
                <h4>Offer Ride</h4>
                {error && <Error error={error.message} />}
                <fieldset disabled={loading}>
                  <label htmlFor="car-image">
                    car image
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
                    current location
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
                      autoComplete="off"
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
                    car type
                    <input
                      type="text"
                      name="carType"
                      value={carType}
                      placeholder="enter car Type"
                      onChange={this.onInputChange}
                    />
                  </label>
                  <label htmlFor="carColor">
                    car color
                    <input
                      type="text"
                      name="carColor"
                      value={carColor}
                      placeholder="enter car color"
                      onChange={this.onInputChange}
                    />
                  </label>
                  <label htmlFor="departure">
                    departure time
                    <input
                      className="departure__time"
                      type="time"
                      name="departure"
                      value={departure}
                      placeholder="enter departure time"
                      onChange={this.onInputChange}
                    />
                  </label>
                  <label htmlFor="plateNumber">
                    car number
                    <input
                      type="text"
                      name="plateNumber"
                      value={plateNumber}
                      placeholder="enter car plate number"
                      onChange={this.onInputChange}
                    />
                  </label>
                  <button type="submit">Create Ride</button>
                  <h5>
                    Want to catch a ride?
{' '}
                    <Link to=" " onClick={toggleForm}>
                      Join
                    </Link>
                  </h5>
                </fieldset>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
CreateRide.propTypes = {
  history: PropTypes.arrayOf.isRequired,
  toggleForm: PropTypes.func.isRequired,
};
export default withRouter(CreateRide);
