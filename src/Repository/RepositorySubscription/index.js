import React from 'react';
import { graphql } from 'react-apollo';
import { WATCH_REPOSITORY } from '../mutations';
import Button from '../../Button';

const VIEWER_SUBSCRIPTIONS = {
    SUBSCRIBED: 'SUBSCRIBED',
    UNSUBSCRIBED: 'UNSUBSCRIBED',
};
  
const isWatch = viewerSubscription =>
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const RepositorySubscription = ({ watchers, viewerSubscription, mutate }) => {
    return (
        <Button
            className={'RepositoryItem-title-action'}
            onClick={mutate}
        >
            {watchers.totalCount}{' '}
            {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
        </Button>
    )
};

export default graphql(WATCH_REPOSITORY, { 
    options: ({ id, viewerSubscription }) => ({
        variables: {
          id,
          viewerSubscription: isWatch(viewerSubscription) 
            ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
            : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
        },
    })
})(RepositorySubscription);