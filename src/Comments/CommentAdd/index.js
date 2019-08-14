import React, { useState, useCallback } from 'react';
import { compose } from 'react-apollo';
import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';
import { withMutation, mutateCacheComments } from '../container';

const CommentAdd = ({ issueId, mutate, result: { error } }) => {
  const [body, setBody] = useState('');
  const onChange = useCallback(e => {
    setBody(e.target.value);
  }, []);

  const onSubmit = event => {
    mutateCacheComments({ mutate, issueId, body }).then(() => setBody(''));
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

export default compose(withMutation)(CommentAdd);
