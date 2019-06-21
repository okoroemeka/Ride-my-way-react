import React, { Component } from 'react';

class Signin extends Component {
  state = {};

  render() {
    return (
      <div className="signin">
        <form>
          <fieldset>
            <label htmlFor="email">
              Email
              <input type="email" name="email" placeholder="enter your email" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" placeholder="enter your password" />
            </label>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Signin;
