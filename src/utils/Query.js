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

export { GET_RIDES, RIDE_REQUEST };
