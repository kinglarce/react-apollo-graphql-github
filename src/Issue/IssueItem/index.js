import React, { useState } from 'react';
import Link from '../../Link';
import Comments, { CommentToggler } from '../../Comments';

import './style.css';

const IssueItem = ({ issue, ...rest }) => {
  const [toggleComment, setToggleComment] = useState(false);
  
  return (
    <div className="IssueItem">
      <div className="IssueItem-content">
        <h3>
          <Link href={issue.url}>{issue.title}</Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />

        <CommentToggler
          toggleComment={toggleComment}
          setToggleComment={setToggleComment}
          issueNumber={issue.number}
          {...rest}
        />
        {toggleComment && (
          <Comments issueNumber={issue.number} {...rest} />
        )}
      </div>
    </div>
  );
};

export default IssueItem;
