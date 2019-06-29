import React, { StrictMode } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
// import dotenv from 'dotenv';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ReactDOM from 'react-dom';
import App from './App';

// dotenv.config();

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'include',
});

const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>,
  document.getElementById('app'),
);
