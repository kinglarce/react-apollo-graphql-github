import React from 'react';

const CommentItem = ({ comment: { author, bodyHTML }}) => {
  const authorLabel = author ? author.login : 'Anonymous';
  return (
    <div>
      <h5>Author: {authorLabel}</h5>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
    </div>
  );
};

export default CommentItem;
