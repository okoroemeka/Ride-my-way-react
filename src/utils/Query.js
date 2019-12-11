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
      id
      approved
      user {
        firstname
        lastname
      }
    }
  }
`;
const RESPOND_TO_REQUEST = gql`
  mutation respondToRideRequest($rideId: Int!, $requestId: Int!, $approved: Boolean!) {
    respondToRideRequest(rideId: $rideId, requestId: $requestId, approved: $approved) {
      text
    }
  }
`;
export {
  GET_RIDES, RIDE_REQUEST, GET_REQUEST, RESPOND_TO_REQUEST,
};
