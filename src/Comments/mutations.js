import gql from 'graphql-tag';

const ADD_COMMENT = gql`
  mutation($subjectId: ID!, $body: String!) {
    addComment(input: { subjectId: $subjectId, body: $body }) {
      commentEdge {
        node {
          body
        }
      }
    }
  }
`;

export { ADD_COMMENT };