import React from 'react';
import IssueItem from '../IssueItem';
import './style.css';

const IssueList = ({ issues }) => (
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>
);

export default IssueList;

