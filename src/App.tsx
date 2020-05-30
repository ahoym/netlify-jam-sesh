import React from 'react';
import './App.css';
import { useAuth0 } from './auth/react-auth0-spa';
import { useUser } from './contexts/user';
import logo from './logo.svg';

function Loader() {
  return <p>Loading...</p>;
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

        <div>
          <span>{user.name}</span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
