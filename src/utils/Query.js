import gql from 'graphql-tag';

const GET_RIDES = gql`
  query getRides {
    getSomeRides {
      id
      carImage
      currentLocation
      destination
      departure
    }
  }
`;
const RIDE_REQUEST = gql`
  mutation rideRequest($rideId: Int!) {
    rideRequest(rideId: $rideId) {
      text
    }
  }
`;
const GET_REQUEST = gql`
  query getRequestByRideId($rideId: Int!) {
    getRequestByRideId(rideId: $rideId) {
      approved
      user {
        firstname
        lastname
      }
    }
  }
`;
export { GET_RIDES, RIDE_REQUEST, GET_REQUEST };
