import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import './App.css';
import { useAuth0 } from './auth/react-auth0-spa';
import logo from './logo.svg';
import { useUser } from './contexts/user';

const HELLO_WORLD = gql`
  {
    hello
  }
`;
type HelloQuery = {
  hello: string;
};

function Loader() {
  return <p>Loading...</p>;
}

function ErrorState() {
  return (
    <p>
      Something went wrong! Try again, and if the issue persists please contact
      support.
    </p>
  );
}

function EmptyState() {
  return <p>No data found.</p>;
}

function TestQuery() {
  const { data, error, loading } = useQuery<HelloQuery>(HELLO_WORLD);

  if (loading) return <Loader />;
  if (error) return <ErrorState />;
  if (!data) return <EmptyState />;

  return <p>{data.hello}</p>;
}

function App() {
  const { isAuthenticated, loading, logout, loginWithRedirect } = useAuth0();
  const user = useUser();

  if (loading) {
    return <Loader />;
  } else if (!isAuthenticated) {
    loginWithRedirect({ redirect_uri: window.location.origin });
    return null;
  } else if (!user) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TestQuery />
        <p>{user.name}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
