// layout.js
import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light mb-2">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Group chat</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>
      {props.children}
    </React.Fragment>
  );
}

export default Layout;
