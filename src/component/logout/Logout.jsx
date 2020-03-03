import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Button from '../reusables/button';
import { LOG_OUT } from '../../utils/Query';

const Logout = (props) => {
  const [logOut] = useMutation(LOG_OUT);
  /**
   * add a spinner here
   */
  const handleLogOut = () => {
    logOut();
    props.history.push('/');
  };
  return (<Button buttonClassName="log__out" buttonText="Log out" type="submit" handleClick={handleLogOut} />);
};

export default withRouter(Logout);
