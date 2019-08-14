import React from 'react';
import CommentItem from '../CommentItem';

const CommentList = ({ comments }) => (
  <div>
    {comments.edges.map(({ node }) => (
      <CommentItem key={node.id} comment={node} />
    ))}
  </div>
);

export default CommentList;
