// eslint-disable-next-line import/no-cycle
import { client as clientApollo } from '../index';
// eslint-disable-next-line import/no-cycle
import { JOIN_RIDE } from '../component/rideOffer/JoinRide';
import { RIDE_REQUEST, GET_REQUEST, RESPOND_TO_REQUEST } from './Query';

const getRides = async ({ currentLocation, destination }, client = clientApollo) => {
  const rides = await client.mutate(
    {
      mutation: JOIN_RIDE,
      name: 'getSomeRides',
      variables: {
        currentLocation,
        destination,
      },
    },
    true,
  );
  return rides;
};

const joinRides = async (rideId, client = clientApollo) => {
  const response = await client.mutate(
    {
      mutation: RIDE_REQUEST,
      name: 'rideRequest',
      variables: {
        rideId,
      },
    },
    true,
  );
  return response;
};
const getRideRequest = async (rideId, client = clientApollo) => {
  const response = await client.query(
    {
      query: GET_REQUEST,
      name: 'getRequestByRideId',
      variables: {
        rideId,
      },
    },
    true,
  );
  return response;
};
const respondToRideRequest = async (rideId, requestId, approved, client = clientApollo) => {
  const response = await client.mutate({
    mutation: RESPOND_TO_REQUEST,
    name: 'respondToRideRequest',
    variables: {
      rideId,
      requestId,
      approved,
    },
  });
  return response;
};
export {
  getRides, joinRides, getRideRequest, respondToRideRequest,
};
