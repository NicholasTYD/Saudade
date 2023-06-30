import React from 'react';
import { getCsrfToken, userIsLoggedIn, getUsername } from './Helpers';
import axios from 'axios';

function logout() {
  axios.post('/api/logout/', {}, {
    headers: {
      'X-CSRFToken': getCsrfToken(),
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    localStorage.clear();
    window.location.href = "/";
  })
  .catch(error => console.log(error));
}

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark px-3 fixed-top">
        <a className="nav-link" href="/">Saudade</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          {userIsLoggedIn() ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/">Record Dream</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/all/">Past Dreams</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stats/">Statistics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="# " onClick={logout} >Log Out</a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login/">Log In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register/">Register</a>
              </li>
            </>
          )}
        </ul>
        {userIsLoggedIn() && 
        <>
        <hr></hr>
          <ul className='navbar-nav ms-auto pb-1'>
            <li>Signed in as <strong>{getUsername()}</strong>
            </li>
          </ul>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;