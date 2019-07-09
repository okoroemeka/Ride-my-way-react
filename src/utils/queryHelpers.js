// eslint-disable-next-line import/no-cycle
import { client as clientApollo } from '../index';
// eslint-disable-next-line import/no-cycle
import { JOIN_RIDE } from '../component/rideOffer/JoinRide';
import { RIDE_REQUEST } from './Query';

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

export { getRides, joinRides };
