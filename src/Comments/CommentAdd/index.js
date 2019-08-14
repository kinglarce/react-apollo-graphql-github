import React, { useState, useCallback } from 'react';
import { graphql } from 'react-apollo';
import { ADD_COMMENT } from '../mutations';
import { ISSUE_FRAGMENT, GET_ISSUE_COMMENTS } from '../queries';
import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';

const updateCommentsCache = (cache, { data: { addComment } }) => {
  const { commentEdge } = addComment;
  const {
    node: {
      issue: { id: issueId },
    },
  } = commentEdge;

  const issueFrag = cache.readFragment({
    id: `Issue:${issueId}`,
    fragment: ISSUE_FRAGMENT,
  });

  cache.writeFragment({
    id: `Issue:${issueId}`,
    fragment: ISSUE_FRAGMENT,
    data: {
      ...issueFrag,
      comments: {
        ...issueFrag.comments,
        edges: [...issueFrag.comments.edges, commentEdge],
      },
    },
  });
};

const CommentAdd = ({ issueId, mutate, result: { error } }) => {
  const [body, setBody] = useState('');
  const onChange = useCallback(e => {
    setBody(e.target.value);
  }, []);

  const onSubmit = event => {
    mutate({
      variables: {
        body,
        subjectId: issueId,
      },
    }).then(() => setBody(''));
    event.preventDefault();
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextArea
          value={body}
          onChange={onChange}
          placeholder="Leave a comment"
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
};

export default graphql(ADD_COMMENT, {
  options: {
    update: updateCommentsCache,
  },
})(CommentAdd);
