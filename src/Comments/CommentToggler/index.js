import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { clientPrefetchComments } from '../container';
import Button from '../../Button';

const COMMENT_LABELS = {
  [true]: 'Closed Comment',
  [false]: 'Open Comment',
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
              clientPrefetchComments({
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

export default CommentToggler;
