# Setup
See the **Technologies** section for a high level overview of the libraries and services used in this template.

1. Setup a netlify account
1. Setup an auth0 account
1. For your hosted db, set up an account at your preferred vendor. This template was built with a hosted DB at heroku.

# Technologies
This template uses various technologies. Specifics can be found in the tech's specific section. As a high level:

- Netlify for hosting and deployment
    - [Link](https://www.netlify.com/)
- Create React App for frontend
    - [Link](https://github.com/facebook/create-react-app)
- Graphql (Apollo) as the specific client + (lambda) server technical implementation
    - [Link for Apollo Client](https://www.apollographql.com/docs/react/get-started/)
    - [Link for Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started/)
- Netlify as a serverless layer through Netlify Functions (hosts the lambdas)
    - [Specific Link for Apollo Lambda Server](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)
    - [Example Guide](https://www.apollographql.com/docs/apollo-server/deployment/netlify/)
- Prisma as an easy ORM layer
    - [Link](https://www.prisma.io/)
- Auth0 as an identity managment solution
    - [Link](https://auth0.com/)

## Optional Technologies
- Heroku to host a (Postgres) DB. However `prisma` can be configured to use any DB
    - [Link](https://www.heroku.com/)
    - [Setup free Postgres DB on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)

# Convenient Reference of Tech stuff

- For graphql --> typescript types, use `graphql-code-generator`
    - https://github.com/dotansimha/graphql-code-generator
    - Plugins: https://graphql-code-generator.com/docs/plugins/index/
- Setup up Postgres DB on heroku
    - https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1

## `prisma` Stuff

- [CRUD API reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/crud)
- [Deploying to Netlify](https://www.prisma.io/docs/guides/deployment/deploying-to-netlify)
- [Quick reference to relations](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/relations)
- [Setup free Postgres DB on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1)


Migration: Save and Create DB

```
npx prisma migrate save --create-db --name init --experimental
```

Migration: up

```
npx prisma migrate up --experimental
```

Prisma studio: View tables/rows

```
npx prisma studio --experimental
```

## Auth0 Stuff

- [Multilple Environments](https://auth0.com/docs/dev-lifecycle/setting-up-env#set-the-environment)

# CRA Generated Stuff

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
