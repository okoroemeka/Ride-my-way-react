import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../commons/Error';
import './Signup.scss';

const SIGNUP_MUTATION = gql`
  mutation signupMutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: Int!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phone: $phone
      password: $password
      confirmPassword: $confirmPassword
    ) {
      firstname
      email
    }
  }
`;
class Signup extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  onInputChange = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, signup) => {
    e.preventDefault();
    await signup();
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    });
  };

  render() {
    const {
      firstname, email, password, confirmPassword, lastname, phone,
    } = this.state;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{ ...this.state, phone: parseInt(phone, 10) }}
      >
        {(createUser, { loading, error }) => (
          <div className="signup">
            <form method="post" onSubmit={e => this.handleSubmit(e, createUser)}>
              <h4>Signup</h4>
              {error && <Error error={error.message} />}
              <fieldset disabled={loading}>
                <label htmlFor="firstname">
                  Fisrtname
                  <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    placeholder="enter your firstname"
                    onChange={this.onInputChange}
                  />
                </label>
                <label htmlFor="lastname">
                  Lastname
                  <input
                    type="text"
                    name="lastname"
                    value={lastname}
                    placeholder="enter your lastname"
                    onChange={this.onInputChange}
                  />
                </label>
                <label htmlFor="lastname">
                  Phone
                  <input
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder="enter your phone number"
                    onChange={this.onInputChange}
                  />
                </label>
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
                <label htmlFor="confirm-password">
                  Confirm password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="confirm password"
                    onChange={this.onInputChange}
                  />
                </label>
                <button type="submit">Signup</button>
                <h6>
                  Already have an account?
                  {' '}
                  <Link to="/signin">Login</Link>
                </h6>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
