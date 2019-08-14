import gql from 'graphql-tag';

const GET_ISSUE_COMMENTS = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueNumber: Int!
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $issueNumber) {
        comments(first: 5) {
          edges {
            node {
              id
              author {
                login
              }
              bodyHTML
            }
          }
        }
      }
    }
  }
`;

export { GET_ISSUE_COMMENTS };
