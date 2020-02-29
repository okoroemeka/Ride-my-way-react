import gql from 'graphql-tag';

const JOIN_RIDES = gql`
  mutation joinRide($input: joinRideInput!) {
    joinRide(input: $input) {
      id
      approved
    }
  }
`;
const GET_REQUESTS = gql`
  query getRequests($input: getRequests) {
    getRideRequests(input: $input) {
      id
      user {
        firstname
        lastname
        phone
      }
      ride {
        id
        destination
      }
    }
  }
`;
const RESPOND_TO_REQUEST = gql`
  mutation respondToRideRequest(
    $input:respondToRequestInput!
  ) {
    respondToRideRequest(
      input:$input
    ) {
      text
    }
  }
`;
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

export { GET_RIDES, GET_REQUEST, RESPOND_TO_REQUEST, JOIN_RIDES, GET_REQUESTS };
