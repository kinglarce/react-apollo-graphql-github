import React, { useState } from 'react';
import Button from '../../Button';
import Link from '../../Link';
import Comments from '../../Comments';

import './style.css';

const COMMENT_LABELS = {
  [true]: 'Closed Comment',
  [false]: 'Open Comment',
};

const IssueItem = ({ issue, ...rest }) => {
  const [toggleComment, setToggleComment] = useState(false);
  
  return (
    <div className="IssueItem">
      <div className="IssueItem-content">
        <h3>
          <Link href={issue.url}>{issue.title}</Link>
        </h3>
        <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
        <div>
          <Button
            onClick={() => setToggleComment(!toggleComment)}
          >
            {COMMENT_LABELS[toggleComment]}
          </Button>
        </div>

        {toggleComment && <Comments issueNumber={issue.number} {...rest} />}
      </div>
    </div>
  );
};

export default IssueItem;
