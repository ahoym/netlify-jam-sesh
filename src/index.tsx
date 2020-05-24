import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from './auth/react-auth0-spa';
import { UserProvider } from './contexts/user';
import './index.css';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: '/.netlify/functions/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        redirect_uri={window.location.origin}
      >
        <UserProvider>
          <App />
        </UserProvider>
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
