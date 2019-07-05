import gql from 'graphql-tag';

const GET_RIDES = gql`
  query getRides {
    getSomeRides {
      carImage
      currentLocation
      destination
      departure
    }
  }
`;
const JOIN_RIDES = gql`
  mutation rideRequest {
    rideRequest {
      pickup_location
      pickup_time
      rideId
    }
  }
`;

export { GET_RIDES, JOIN_RIDES };
