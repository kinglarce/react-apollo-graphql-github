import React from 'react';
import CommentItem from '../CommentItem';
import FetchMore from '../../FetchMore';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  // The spread with is only previousResult is used for the __typename
  return {
    ...previousResult,
    repository: {
      ...previousResult.repository,
      issue: {
        ...previousResult.repository.issue,
        comments: {
          ...previousResult.repository.issue.comments,
          ...fetchMoreResult.repository.issue.comments, // This is for the new pageInfo result
          edges: [ // Here is where the real updating of data
            ...previousResult.repository.issue.comments.edges,
            ...fetchMoreResult.repository.issue.comments.edges,
          ],
        },
      },
    },
  };
};

const CommentList = ({ loading, comments, fetchMore }) => (
  <div className="CommentList">
    <fieldset>
      {comments.edges.map(({ node }) => (
        <CommentItem key={node.id} comment={node} />
      ))}
    </fieldset>

    <FetchMore
      loading={loading}
      hasNextPage={comments.pageInfo.hasNextPage}
      variables={{
        cursor: comments.pageInfo.endCursor,
      }}
      updateQuery={updateQuery}
      fetchMore={fetchMore}
    >
      Repositories
    </FetchMore>
  </div>
);

export default CommentList;
