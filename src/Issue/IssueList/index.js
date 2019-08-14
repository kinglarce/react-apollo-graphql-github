import React from 'react';
import IssueItem from '../IssueItem';
import './style.css';

const IssueList = ({ issues, ...rest }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} {...rest} />
    ))}
  </div>
);

export default IssueList;

