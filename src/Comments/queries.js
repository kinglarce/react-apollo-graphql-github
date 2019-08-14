import gql from 'graphql-tag';

const GET_ISSUE_COMMENTS = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueNumber: Int!
    $cursor: String
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $issueNumber) {
        id
        comments(first: 5, after: $cursor) {
          edges {
            node {
              id
              author {
                login
              }
              bodyHTML
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export { GET_ISSUE_COMMENTS };
