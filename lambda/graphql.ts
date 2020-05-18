import { ApolloServer, gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type HelloWorld {
    id: ID!
    hello: String
  }

  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent: any, args: any, context: any) => {
      return 'Hello, world!';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
