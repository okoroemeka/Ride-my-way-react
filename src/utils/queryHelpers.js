// eslint-disable-next-line import/no-cycle
import { client as clientApollo } from '../index';
// eslint-disable-next-line import/no-cycle
import { JOIN_RIDE } from '../component/rideOffer/JoinRide';

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

export default getRides;
