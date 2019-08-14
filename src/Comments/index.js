import React from 'react';
import CommentList from './CommentList';
import { graphql, ApolloConsumer } from 'react-apollo';
import { GET_ISSUE_COMMENTS } from './queries';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Button from '../Button';

const COMMENT_LABELS = {
  [true]: 'Closed Comment',
  [false]: 'Open Comment',
};

const Comments = ({
  data: { loading, error, repository, fetchMore },
}) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !repository) {
    return <Loading />;
  }

  const {
    issue: { comments },
  } = repository;

  if (!comments.edges.length) {
    return <div>No comments ...</div>;
  }

  return (
    <CommentList
      loading={loading}
      comments={comments}
      fetchMore={fetchMore}
    />
  );
};

const prefetchComments = props => {
  const {
    client,
    issueNumber,
    repositoryName,
    repositoryOwner,
  } = props;

  client.query({
    query: GET_ISSUE_COMMENTS,
    variables: {
      issueNumber,
      repositoryName,
      repositoryOwner,
    },
  });
};

const CommentToggler = ({
  toggleComment,
  setToggleComment,
  issueNumber,
  repositoryName,
  repositoryOwner,
}) => {
  return (
    <ApolloConsumer>
      {client => (
        <div>
          <Button
            onClick={() => setToggleComment(!toggleComment)}
            onMouseOver={() =>
              prefetchComments({
                client,
                issueNumber,
                repositoryName,
                repositoryOwner,
              })
            }
          >
            {COMMENT_LABELS[toggleComment]}
          </Button>
        </div>
      )}
    </ApolloConsumer>
  );
};

export { CommentToggler };

export default graphql(GET_ISSUE_COMMENTS, {
  options: ({ issueNumber, repositoryName, repositoryOwner }) => ({
    variables: {
      issueNumber,
      repositoryName,
      repositoryOwner,
    },
  }),
})(Comments);
