# A React + Apollo + GraphQL for GitHub API

A React application consuming the GitHub API with React Apollo.

## Features

* React 16 with create-react-app
* React Apollo + Apollo Client
* Apollo In Memory Cache + Apollo Link Http
* Apollo with GitHub GraphQL API
  * Queries and Mutations with render props
  * Optimistic Updates
  * Pagination
  * Optimistic Fetch (e.g. Issues)

## Installation

* `git clone https://github.com/kinglarce/react-apollo-graphql-github.git`
* `cd react-apollo-graphql-github`
* [add your own REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN in .env file](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
  * scopes/permissions you need to check: admin:org, repo, user, notifications
* `npm install`
* `npm start`
* visit `http://localhost:3000`

