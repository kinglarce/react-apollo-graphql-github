import React from 'react';
import { Query } from 'react-apollo';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './gql';

import Loading from '../Loading';
import RepositoryList from '../Repository';

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data, loading }) => {
      console.log({ data, loading });
      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

export default Profile;