import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { GET_USER } from '../../utils/Query';

const User = ({ children }) => {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading || error) {
    return null;
  }
  return <Fragment>{children(data, error)}</Fragment>;
};

export default User;

User.propTypes = {
  children: PropTypes.element.isRequired,
}