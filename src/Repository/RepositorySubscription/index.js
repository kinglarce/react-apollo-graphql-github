import React from 'react';
import { graphql } from 'react-apollo';
import { WATCH_REPOSITORY } from '../mutations';
import REPOSITORY_FRAGMENT from '../fragments';
import Button from '../../Button';

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
};

const isWatch = viewerSubscription =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const updateWatch = (
  cache,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  },
) => {
  const repository = cache.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;

  cache.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};

const RepositorySubscription = ({
  watchers,
  viewerSubscription,
  mutate,
}) => {
  return (
    <Button
      className={'RepositoryItem-title-action'}
      onClick={mutate}
    >
      {watchers.totalCount}{' '}
      {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
    </Button>
  );
};

export default graphql(WATCH_REPOSITORY, {
  options: ({ id, viewerSubscription }) => ({
    variables: {
      id,
      viewerSubscription: isWatch(viewerSubscription)
        ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
        : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
    },
    update: updateWatch
  }),
})(RepositorySubscription);
