import gql from 'graphql-tag';

const ADD_COMMENT = gql`
  mutation($subjectId: ID!, $body: String!) {
    addComment(input: { subjectId: $subjectId, body: $body }) {
      commentEdge {
        node {
          id
          author {
            login
          }
          bodyHTML
          issue {
            id
          }
        }
      }
    }
  }
`;

export { ADD_COMMENT };
