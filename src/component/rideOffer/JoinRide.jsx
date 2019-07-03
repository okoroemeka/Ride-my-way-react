import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from '../commons/Error';

const JOIN_RIDE = gql`
  mutation JOIN_RIDE($currentLocation: String!, $destination: String!) {
    getSomeRides(currentLocation: $currentLocation, destination: $destination) {
      carImage
      currentLocation
      destination
      departure
    }
  }
`;
class JoinRide extends Component {
  state = {
    currentLocation: '',
    destination: '',
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleJoinRide = async (e, joinRide) => {
    const { history } = this.props;
    e.preventDefault();
    await joinRide();
    this.setState({
      currentLocation: '',
      destination: '',
    });
    history.push('/');
  };

  render() {
    const { currentLocation, destination } = this.state;
    const { toggleForm } = this.props;
    return (
      <Fragment>
        <Mutation mutation={JOIN_RIDE} variables={{ destination, currentLocation }}>
          {(getSomeRides, { loading, error }) => (
            <div className="col-6 join-ride-container">
              <div className="join-ride">
                <form method="post" onSubmit={e => this.handleJoinRide(e, getSomeRides)}>
                  <h4>Join Ride</h4>
                  {error && <Error error={error.message} />}
                  <fieldset disabled={loading}>
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
                    <button type="submit">Join Ride</button>
                    <h5>
                      Want to create a ride?
                      {' '}
                      <Link to=" " onClick={toggleForm}>
                        Create
                      </Link>
                    </h5>
                  </fieldset>
                </form>
              </div>
            </div>
          )}
        </Mutation>
      </Fragment>
    );
  }
}
JoinRide.propTypes = {
  history: PropTypes.arrayOf.isRequired,
  toggleForm: PropTypes.func.isRequired,
};
export default withRouter(JoinRide);
