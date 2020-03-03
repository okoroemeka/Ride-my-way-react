/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import './requestWrapper.scss';
import { getRideRequests } from '../../../utils/queryHelpers';

// stopped here, need to add get ride request query
const RequestWrapper = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const { rideId, children } = props;
  useEffect(() => {
    setError(null);
    setIsFetching(true);
    getRideRequests(rideId)
      .then((result) => {
        setData(result.data.getRideRequests);
        setIsFetching(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsFetching(false);
      });
  }, [rideId]);
  return <div className="request__wrapper">{children(data, isFetching, error)}</div>;
};

export default RequestWrapper;
