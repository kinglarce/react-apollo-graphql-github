import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';
import OrganizationSearch from '../../Organization/OrganizationSearch';

import './style.css';

const Navigation = ({ location: { pathname } }) => {
  const [organizationName, setOrganizationName] = useState(
    'facebook',
  );

  return (
    <header className="Navigation">
      <div className="Navigation-link">
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div className="Navigation-link">
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>

      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          organizationName={organizationName}
          onOrganizationSearch={setOrganizationName}
        />
      )}
    </header>
  );
};

export default withRouter(Navigation);
