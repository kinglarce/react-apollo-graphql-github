import React from 'react';
import { Mutation } from 'react-apollo';
import RepositorySubscription from '../RepositorySubscription';

import REPOSITORY_FRAGMENT from '../fragments';
import Link from '../../Link';
import Button from '../../Button';

import '../style.css';

import { STAR_REPOSITORY, UNSTAR_REPOSITORY } from '../mutations';

const getUpdatedStarData = (cache, id, viewerHasStarred) => {
  const repository = cache.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  let { totalCount } = repository.stargazers;
  totalCount = viewerHasStarred ? totalCount + 1 : totalCount - 1;

  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount,
    },
  };
};

const updateAddStar = (
  cache,
  {
    data: {
      addStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) =>
  cache.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedStarData(cache, id, viewerHasStarred),
  });

const updateRemoveStar = (
  cache,
  {
    data: {
      removeStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) =>
  cache.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: getUpdatedStarData(cache, id, viewerHasStarred),
  });

// Although below will(the commented out) still work but GQL will complain on console because this
// is not an object literal anymore, but as a class object. For Render-props, it is ideal to just put it inlined.
// Warning: Failed prop type: Invalid prop `optimisticResponse` of type `function` supplied to `Mutation`, expected `object`.

// const optimisticStarTempData = ({ id, viewerHasStarred }) => ({
//   __typename: 'Mutation',
//   starrable: {
//     __typename: 'Repository',
//     id,
//     viewerHasStarred: !viewerHasStarred,
//   },
// });

// const optimisticAddStar = variables => ({
//   addStar: optimisticStarTempData(variables),
// });

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="RepositoryItem-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

      <div>
        <RepositorySubscription
          id={id}
          watchers={watchers}
          viewerSubscription={viewerSubscription}
        />

        {!viewerHasStarred ? (
          <Mutation
            mutation={STAR_REPOSITORY}
            variables={{ id, viewerHasStarred }}
            update={updateAddStar}
            optimisticResponse={{
              addStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
          >
            {(addStar, { data, loading, error }) => (
              <Button
                className={'RepositoryItem-title-action'}
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation
            mutation={UNSTAR_REPOSITORY}
            variables={{ id, viewerHasStarred }}
            update={updateRemoveStar}
            optimisticResponse={{
              removeStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
          >
            {(removeStar, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                onClick={removeStar}
              >
                {stargazers.totalCount} Unstar
              </Button>
            )}
          </Mutation>
        )}

        {/* Here comes your updateSubscription mutation */}
      </div>
    </div>

    <div className="RepositoryItem-description">
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="RepositoryItem-description-details">
        <div>
          {primaryLanguage && (
            <span>Language: {primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
