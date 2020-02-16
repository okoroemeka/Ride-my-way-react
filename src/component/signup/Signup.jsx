/* eslint-disable no-nested-ternary */
import React, { useReducer, useCallback, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from '../commons/Error';
import '../commons/auth.scss';

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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        error: '',
      };
    default:
      return state;
  }
};
const SIGNUP_MUTATION = gql`
  mutation SignUp($input: NewUserInput!) {
    createUser(input: $input) {
      lastname
      firstname
      email
    }
  }
`;
const Signup = (props) => {
  const [formState, dispatchFormState] = useReducer(formRducer, {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const [signup, newUser] = useMutation(SIGNUP_MUTATION);
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
    try {
      e.preventDefault();
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        phone,
      } = formState;
      const checkEmailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        firstname.trim().length < 1
      && lastname.trim().length < 1
      && email.trim().length < 1
      && password.trim().length < 1
      && phone.trim().length < 1
      ) {
        return dispatchFormState({
          type: FORM_ACTION,
          inputName: 'error',
          inputValue: 'some fields are empty',
        });
      }
      if (password !== confirmPassword) {
        return dispatchFormState({
          type: FORM_ACTION,
          inputName: 'error',
          inputValue: 'passwords do not match',
        });
      }
      if (!checkEmailInput.test(email)) {
        return dispatchFormState({
          type: FORM_ACTION,
          inputName: 'error',
          inputValue: 'Invalid email',
        });
      }
      setLoading(true);
      await signup({
        variables: {
          input: {
            firstname,
            email,
            password,
            confirmPassword,
            lastname,
            phone: String(phone),
          },
        },
      });
      dispatchFormState({ type: CLEAR_FORM });

      const { history } = props;
      return history.push('/dashboard');
    } catch (error) {
      dispatchFormState({
        type: FORM_ACTION,
        inputName: 'error',
        inputValue: 'An error occured try again later',
      });
    }
    setLoading(false);
  };

  const {
    firstname,
    email,
    password,
    confirmPassword,
    lastname,
    phone,
    error,
  } = formState;
  const { click } = props;

  return (
    <div className="signup">
      <form method="post" onSubmit={e => handleSubmit(e)}>
        <h4>Signup</h4>
        {(error.length || newUser.error) && (
          <Error
            error={
              newUser.error
                ? newUser.error.message.split('GraphQL error:')[1].trim()
                  === 'User already exist, please signin to continue.'
                  ? 'User already exists'
                  : 'An error occured please try again'
                : error
            }
          />
        )}
        <fieldset disabled={loading}>
          <label htmlFor="firstname">
            First name
            <input
              type="text"
              name="firstname"
              value={firstname}
              placeholder="enter your firstname"
              onChange={onInputChange}
              required
            />
          </label>
          <label htmlFor="lastname">
            Last name
            <input
              type="text"
              name="lastname"
              value={lastname}
              placeholder="enter your lastname"
              onChange={onInputChange}
              required
            />
          </label>
          <label htmlFor="phone">
            Phone
            <input
              type="tel"
              name="phone"
              value={phone}
              placeholder="enter your phone number"
              onChange={onInputChange}
              required
            />
          </label>
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
          <label htmlFor="confirm-password">
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="confirm password"
              onChange={onInputChange}
              required
            />
          </label>
          <button type="submit">Signup</button>
          <h6>
            Already have an account?
            {' '}
            <Link to="/signin" onClick={click}>
              Login
            </Link>
          </h6>
        </fieldset>
      </form>
    </div>
  );
};
Signup.propTypes = {
  click: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

export default withRouter(Signup);
