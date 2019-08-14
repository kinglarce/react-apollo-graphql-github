import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { GET_ISSUE_COMMENTS } from '../queries';
import Button from '../../Button';

const COMMENT_LABELS = {
  [true]: 'Closed Comment',
  [false]: 'Open Comment',
};

const prefetchComments = props => {
  const {
    client,
    issueNumber,
    repositoryName,
    repositoryOwner,
  } = props;

  client.query({
    query: GET_ISSUE_COMMENTS,
    variables: {
      issueNumber,
      repositoryName,
      repositoryOwner,
    },
  });
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
              prefetchComments({
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
