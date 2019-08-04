import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;