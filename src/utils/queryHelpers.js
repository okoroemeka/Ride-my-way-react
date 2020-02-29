// eslint-disable-next-line import/no-cycle
import { client as clientApollo } from '../index';
// eslint-disable-next-line import/no-cycle
import {
  GET_REQUEST, RESPOND_TO_REQUEST, JOIN_RIDES, GET_REQUESTS,
} from './Query';

const getRides = async (query, { pickup, destination }, client = clientApollo) => {
  const rides = await client.query(
    {
      query,
      name: 'getRides',
      variables: {
        input: {
          pickup,
          destination,
        },
      },
    },
    true,
  );
  return rides;
};

const joinRides = async (rideId, client = clientApollo) => {
  const response = await client.mutate(
    {
      mutation: JOIN_RIDES,
      name: 'rideRequest',
      variables: {
        input: { rideId },
      },
    },
    true,
  );
  return response;
};
const getRideRequests = async (rideId, client = clientApollo) => {
  const requests = await client.query(
    {
      query: GET_REQUESTS,
      name: 'getRideRequest',
      variables: {
        input: {
          rideId,
        },
      },
    },
    true,
  );
  return requests;
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
const respondToRideRequest = async (
  rideId,
  requestId,
  approved,
  client = clientApollo,
) => {
  const response = await client.mutate({
    mutation: RESPOND_TO_REQUEST,
    name: 'respondToRideRequest',
    variables: {
      input: {
        rideId,
        requestId,
        approved,
      },
    },
  });
  return response;
};
export {
  getRides, joinRides, getRideRequest, respondToRideRequest, getRideRequests,
};
