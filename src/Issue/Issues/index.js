import React from 'react';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';
import { GET_ISSUES_OF_REPOSITORY } from './queries';
import IssueList from '../IssueList';
import { ButtonUnobtrusive } from '../../Button';
import { graphql, ApolloConsumer } from 'react-apollo';

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

const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issueState,
) => {
  const nextIssueState = TRANSITION_STATE[issueState];

  client.query({
    query: GET_ISSUES_OF_REPOSITORY,
    variables: {
      repositoryOwner,
      repositoryName,
      issueState: nextIssueState,
    },
  });
};

const IssueFilter = ({
  repositoryOwner,
  repositoryName,
  issueState,
  onChangeIssueState,
}) => (
  <ApolloConsumer>
    {client => (
      <ButtonUnobtrusive
        onClick={() =>
          onChangeIssueState(TRANSITION_STATE[issueState])
        }
        onMouseOver={() =>
          prefetchIssues(
            client,
            repositoryOwner,
            repositoryName,
            issueState,
          )
        }
      >
        {TRANSITION_LABELS[issueState]}
      </ButtonUnobtrusive>
    )}
  </ApolloConsumer>
);

const Issues = ({
  data: { loading, error, repository },
  issueState,
  setIssueState,
  repositoryOwner,
  repositoryName,
}) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !repository) {
    return <Loading />;
  }

  return (
    <div className="Issues">
      <IssueFilter
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
        issueState={issueState}
        onChangeIssueState={setIssueState}
      />

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
