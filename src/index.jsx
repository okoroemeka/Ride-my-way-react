import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import dotenv from 'dotenv';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-cycle
import App from './App';

// dotenv.config();

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/',
  credentials: 'include',
});

// eslint-disable-next-line import/prefer-default-export
export const client = new ApolloClient({
  cache,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ApolloProvider>,
  document.getElementById('app'),
);
