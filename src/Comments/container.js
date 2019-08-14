import { graphql } from 'react-apollo';
import { GET_ISSUE_COMMENTS, ISSUE_FRAGMENT } from './queries';
import { ADD_COMMENT } from './mutations';

const withQuery = wrappedComponent => {
  return graphql(GET_ISSUE_COMMENTS, {
    options: ({ issueNumber, repositoryName, repositoryOwner }) => ({
      variables: {
        issueNumber,
        repositoryName,
        repositoryOwner,
      },
    }),
  })(wrappedComponent);
};

const withMutation = wrappedComponent => {
  return graphql(ADD_COMMENT, {
    options: {
      update: updateCommentsCache,
    },
  })(wrappedComponent);
};

const clientPrefetchComments = ({
  client,
  issueNumber,
  repositoryName,
  repositoryOwner,
}) =>
  client.query({
    query: GET_ISSUE_COMMENTS,
    variables: {
      issueNumber,
      repositoryName,
      repositoryOwner,
    },
  });

const mutateCacheComments = ({ mutate, issueId, body }) =>
  mutate({
    variables: {
      subjectId: issueId,
      body,
    },
    optimisticResponse: optimisticUIComment(issueId, body),
  });

// Prevent from desctructuing in the parameter level and do it inside the function
// because there's a difference. Destructuring in the parameter level result into
// not finding the `commentEdge` from the optimisticUI
const updateCommentsCache = (cache, { data }) => {
  // Destructure here to make the optimistic UI work
  const {
    addComment: { commentEdge },
  } = data;
  const {
    node: {
      issue: { id: issueId },
    },
  } = commentEdge;

  const issueFragment = cache.readFragment({
    id: `Issue:${issueId}`,
    fragment: ISSUE_FRAGMENT,
  });

  cache.writeFragment({
    id: `Issue:${issueId}`,
    fragment: ISSUE_FRAGMENT,
    data: {
      ...issueFragment,
      comments: {
        ...issueFragment.comments,
        edges: [...issueFragment.comments.edges, commentEdge],
      },
    },
  });
};

const optimisticUIComment = (issueId, body) => ({
  addComment: {
    commentEdge: {
      node: {
        author: {
          login: 'kinglarce',
          __typename: 'User',
        },
        bodyHTML: body,
        id: '',
        issue: {
          id: issueId,
          __typename: 'Issue',
        },
        __typename: 'IssueComment',
      },
      __typename: 'IssueCommentEdge',
    },
    __typename: 'AddCommentPayload',
  },
});

export {
  withQuery,
  withMutation,
  clientPrefetchComments,
  mutateCacheComments,
};
