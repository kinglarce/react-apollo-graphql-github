import React from 'react';
import CommentList from './CommentList';
import { graphql } from 'react-apollo';
import { GET_ISSUE_COMMENTS } from './queries';
import Loading from '../Loading';
import ErrorMessage from '../Error';

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

export default graphql(GET_ISSUE_COMMENTS, {
  options: ({ issueNumber, repositoryName, repositoryOwner }) => ({
    variables: {
      issueNumber,
      repositoryName,
      repositoryOwner,
    },
  }),
})(Comments);
