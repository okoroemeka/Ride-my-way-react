/* eslint-disable no-nested-ternary */
import React, { useCallback, useState, useReducer } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import '../commons/auth.scss';
import Error from '../commons/Error';

const FORM_ACTION = 'FORM_ACTION';
const CLEAR_FORM = 'CLEAR_FORM';

const formRducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTION:
      return {
        ...state,
        [action.inputName]: action.inputValue,
      };
    case CLEAR_FORM:
      return {
        email: '',
        password: '',
        error: '',
      };
    default:
      return state;
  }
};
const SIGNIN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      email
    }
  }
`;
const Signin = (props) => {
  const [formState, dispatchFormState] = useReducer(formRducer, {
    email: '',
    password: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const [signIn, user] = useMutation(SIGNIN_MUTATION);

  const onInputChange = useCallback(
    (event) => {
      const {
        target: { name, value },
      } = event;
      dispatchFormState({
        type: FORM_ACTION,
        inputName: name,
        inputValue: value,
      });
    },
    [dispatchFormState],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    const { history } = props;
    try {
      if (email.trim().length < 1 && password.trim().length < 1) {
        dispatchFormState({
          type: FORM_ACTION,
          inputName: 'error',
          inputValue: "email and password fields can't be empty",
        });
      } else {
        setLoading(true);
        await signIn({
          variables: { input: { email, password } },
        });
        dispatchFormState({ type: CLEAR_FORM });
        history.push('/dashboard');
      }
    } catch (error) {
      dispatchFormState({
        type: FORM_ACTION,
        inputName: 'error',
        inputValue: 'An error occured please, try again',
      });
    }
    setLoading(false);
  };

  const { email, password, error } = formState;
  const { click } = props;
  return (
    <div className="signin">
      <form method="post" onSubmit={e => handleSubmit(e)}>
        <h4>Login</h4>
        {(error.length || user.error) && (
          <Error
            error={
              user.error
                ? user.error.message.split('GraphQL error:')[1].trim()
                  === 'Wrong email or password'
                  ? 'Wrong email or password'
                  : 'An error occured please try again'
                : error
            }
          />
        )}
        <fieldset disabled={loading}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={email}
              placeholder="enter your email"
              onChange={onInputChange}
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              value={password}
              placeholder="enter your password"
              onChange={onInputChange}
              required
            />
          </label>
          <button type="submit">Login</button>
          <h6>
            Do not have an account?
            {' '}
            <Link to="/signin" onClick={click}>
              Signup
            </Link>
          </h6>
        </fieldset>
      </form>
    </div>
  );
};

Signin.propTypes = {
  click: PropTypes.func.isRequired,
  history: PropTypes.arrayOf.isRequired,
};
export default withRouter(Signin);
