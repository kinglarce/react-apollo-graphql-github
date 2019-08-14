import React from 'react';

import { Query } from 'react-apollo';
import { GET_REPOSITORIES_OF_ORGANIZATION } from './queries';

const Organization = ({ organizationName }) => (
  <Query
    query={GET_REPOSITORIES_OF_ORGANIZATION}
    variables={{
      organizationName,
    }}
    skip={organizationName === ''}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      console.log('the org data : ', { data, loading, error, fetchMore });
    }}
  </Query>
);

export default Organization;