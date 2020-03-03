import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GET_USER } from '../../utils/Query';

const Auth = (props) => {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) {
    return <div>please add a spinner for loading...</div>;
  }
  if (!data.getUser || error) {
    props.history.push('/');
    return null;
  }
  return props.children;
};
Auth.propTypes = {
  children: PropTypes.element.isRequired,
};
export default withRouter(Auth);
