import { ApolloServer, gql } from 'apollo-server-lambda';
import { Resolvers, User } from '../src/types';
import { createSuccessfulMutationResponse } from './utils/normalization';
import { prisma } from './utils/prisma-client';

const typeDefs = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type UserProfile {
    id: ID!
    user: User
    userId: String
  }

  type User {
    id: ID!
    subId: String!
    email: String
    name: String
    profile: UserProfile
  }

  type Auth0User {
    sub: ID!
    nickname: String!
    name: String!
    email: String
  }

  input GetOrCreateUserFromAuthDataInput {
    sub: ID!
    nickname: String!
    name: String!
    email: String
  }

  input GetUserInput {
    id: ID
    email: String
    name: String
    subId: String
  }

  type GetOrCreateUserResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    payload: User
  }

  type Query {
    getUser(queryParams: GetUserInput): User
  }

  type Mutation {
    getOrCreateUserFromAuthData(
      authData: GetOrCreateUserFromAuthDataInput!
    ): GetOrCreateUserResponse
  }
`;

const resolvers: Resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      const response = await prisma.user.findOne({ where: args.queryParams });
      return response;
    },
  },
  Mutation: {
    getOrCreateUserFromAuthData: async (parent, args, context) => {
      const authData = args.authData;
      const response = await prisma.user.findOne({
        where: { subId: authData.sub },
      });
      let user = response;

      if (!user) {
        console.log('Auth0 user not found in DB, creating app DB record');

        user = await prisma.user.create({
          data: {
            email: authData.email,
            name: authData.name || authData.nickname,
            subId: authData.sub,
          },
        });
      }

      return createSuccessfulMutationResponse<User>({
        mutationName: 'getOrCreateUserFromAuthData',
        payload: user,
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
