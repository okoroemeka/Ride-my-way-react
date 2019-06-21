import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './component/home/Home';
import Header from './component/header/Header';
import './styles/style.css';

class App extends Component {
  state = {
    isAuth: true,
  };

  render() {
    const { isAuth } = this.state;
    return (
      <div className="container">
        <BrowserRouter>
          {!isAuth && <Header />}
          <Fragment>
            <Switch>
              <Route to="/" exact component={Home} />
            </Switch>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
