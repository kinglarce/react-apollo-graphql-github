import React, { useState } from 'react';
import Issues, { ISSUE_STATES } from './Issues';

const IssuesHOC = props => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.OPEN);
  return (
    <Issues
      issueState={issueState}
      setIssueState={setIssueState}
      {...props}
    />
  );
};

export default IssuesHOC;
