import gql from 'graphql-tag';

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
    query($cursor: String) {
    viewer {
        repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
        ) {
        edges {
            node {
            ...repository
            }
        }
        pageInfo {
            endCursor
            hasNextPage
        }
        }
    }
    }
`;