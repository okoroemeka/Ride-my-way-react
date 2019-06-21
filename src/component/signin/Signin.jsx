import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import '../commons/auth.scss';
import Error from '../commons/Error';

const SIGNUP_MUTATION = gql`
  mutation signInMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      firstname
      email
    }
  }
`;
class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, signIn) => {
    e.preventDefault();
    await signIn();
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { email, password } = this.state;
    const { click } = this.props;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signIn, { loading, error }) => (
          <div className="signin">
            <form method="post" onSubmit={e => this.handleSubmit(e, signIn)}>
              <h4>Login</h4>
              {error && <Error error={error.message} />}
              <fieldset disabled={loading}>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="enter your email"
                    onChange={this.onInputChange}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="enter your password"
                    onChange={this.onInputChange}
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
        )}
      </Mutation>
    );
  }
}

Signin.propTypes = {
  click: PropTypes.func.isRequired,
};
export default Signin;
