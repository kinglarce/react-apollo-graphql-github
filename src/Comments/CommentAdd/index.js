import React, { useState, useCallback } from 'react';
import { graphql } from 'react-apollo';
import { ADD_COMMENT } from '../mutations';
import { ISSUE_FRAGMENT } from '../queries';
import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';

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
      optimisticResponse: optimisticUIComment(issueId, body),
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
