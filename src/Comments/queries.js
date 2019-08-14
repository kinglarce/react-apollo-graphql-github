import gql from 'graphql-tag';

const ISSUE_FRAGMENT = gql`
  fragment issue on Issue {
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
`;

const GET_ISSUE_COMMENTS = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $issueNumber: Int!
    $cursor: String
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $issueNumber) {
        ...issue
      }
    }
  }

  ${ISSUE_FRAGMENT}
`;

export { GET_ISSUE_COMMENTS, ISSUE_FRAGMENT };
