import React from 'react';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import { GET_ISSUES_OF_REPOSITORY } from './queries';
import IssueList from '../IssueList';
import { ButtonUnobtrusive } from '../../Button';
import { graphql } from 'react-apollo';

export const ISSUE_STATES = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.OPEN]: 'Show Closed Issues',
  [ISSUE_STATES.CLOSED]: 'Show Open Issues',
};

const TRANSITION_STATE = {
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.OPEN,
};

const Issues = ({
  data: { loading, error, repository },
  issueState,
  setIssueState,
}) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !repository) {
    return <Loading />;
  }

  return (
    <div className="Issues">
      <ButtonUnobtrusive
        onClick={() => setIssueState(TRANSITION_STATE[issueState])}
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>

      <IssueList issues={repository.issues} />
    </div>
  );
};

export default graphql(GET_ISSUES_OF_REPOSITORY, {
  options: ({ repositoryOwner, repositoryName, issueState }) => ({
    variables: {
      repositoryOwner,
      repositoryName,
      issueState,
    },
  }),
})(Issues);
