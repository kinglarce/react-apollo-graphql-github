import React, { useState, useCallback } from 'react';
import { graphql } from 'react-apollo';
import { ADD_COMMENT } from '../mutations';
import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';

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

export default graphql(ADD_COMMENT)(CommentAdd);
