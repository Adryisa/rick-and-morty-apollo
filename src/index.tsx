import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'fast-text-encoding/text';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById('root')
);
