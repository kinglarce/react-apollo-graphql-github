import React from 'react';
import { graphql } from 'react-apollo';
import { GET_REPOSITORIES_OF_CURRENT_USER } from './gql';

import Loading from '../Loading';
import RepositoryList from '../Repository';
import ErrorMessage from '../Error';

const Profile = ({ data, loading, error }) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { viewer } = data;

  if (loading || !viewer) {
    return <Loading />;
  }

  return <RepositoryList repositories={viewer.repositories} />;
};


export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);