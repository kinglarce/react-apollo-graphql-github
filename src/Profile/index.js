import React from 'react';
import { graphql } from 'react-apollo';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './queries';

import Loading from '../Loading';
import RepositoryList from '../Repository';
import ErrorMessage from '../Error';

const Profile = ({ data: { loading, error, fetchMore, viewer } }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading || !viewer) {
    return <Loading />;
  }

  return (
    <RepositoryList
      repositories={viewer.repositories}
      fetchMore={fetchMore}
    />
  );
};

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER, {
  options: { notifyOnNetworkStatusChange: true },
})(Profile);
