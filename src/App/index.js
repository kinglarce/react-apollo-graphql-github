import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Profile from '../Profile';
import Organization from '../Organization';

import * as routes from '../constants/routes';

import './style.css';

const App = () => {
  const [organizationName, setOrganizationName] = useState(
    'facebook',
  );

  const onOrganizationSearch = useCallback((searched) => {
    setOrganizationName(searched);
  }, [])

  return (
    <Router>
      <div className="App">
        <Navigation
          organizationName={organizationName}
          setOrganizationName={onOrganizationSearch}
        />

        <div className="App-main">
          <Route
            exact
            path={routes.ORGANIZATION}
            component={() => (
              <div className="App-content_large-header">
                <Organization organizationName={organizationName} />
              </div>
            )}
          />
          <Route
            exact
            path={routes.PROFILE}
            component={() => (
              <div className="App-content_small-header">
                <Profile />
              </div>
            )}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
