import React, { Fragment } from 'react';
import { compose } from 'react-apollo';
import CommentList from './CommentList';
import CommentAdd from './CommentAdd';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import CommentToggler from './CommentToggler';
import { withQuery } from './container';

const Comments = ({
  data: { loading, error, repository, fetchMore },
}) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !repository) {
    return <Loading />;
  }

  const { issue } = repository;

  if (!issue.comments.edges.length) {
    return <div>No comments ...</div>;
  }

  return (
    <Fragment>
      <CommentList
        loading={loading}
        comments={issue.comments}
        fetchMore={fetchMore}
      />
      <CommentAdd issueId={issue.id} />
    </Fragment>
  );
};

export { CommentToggler };

export default compose(withQuery)(Comments);
