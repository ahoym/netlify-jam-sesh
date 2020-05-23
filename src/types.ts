import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type UserProfile = {
   __typename?: 'UserProfile';
  id: Scalars['ID'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  subId?: Maybe<Scalars['String']>;
};

export type Auth0User = {
   __typename?: 'Auth0User';
  sub: Scalars['ID'];
  nickname: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type GetOrCreateUserFromAuthDataInput = {
  sub: Scalars['ID'];
  nickname: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
};

export type GetUserInput = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  subId?: Maybe<Scalars['String']>;
};

export type GetOrCreateUserResponse = MutationResponse & {
   __typename?: 'GetOrCreateUserResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  payload: User;
};

export type Query = {
   __typename?: 'Query';
  getUser?: Maybe<User>;
};


export type QueryGetUserArgs = {
  queryParams?: Maybe<GetUserInput>;
};

export type Mutation = {
   __typename?: 'Mutation';
  getOrCreateUserFromAuthData: GetOrCreateUserResponse;
};


export type MutationGetOrCreateUserFromAuthDataArgs = {
  authData: GetOrCreateUserFromAuthDataInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MutationResponse: ResolversTypes['GetOrCreateUserResponse'];
  UserProfile: ResolverTypeWrapper<UserProfile>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  User: ResolverTypeWrapper<User>;
  Auth0User: ResolverTypeWrapper<Auth0User>;
  GetOrCreateUserFromAuthDataInput: GetOrCreateUserFromAuthDataInput;
  GetUserInput: GetUserInput;
  GetOrCreateUserResponse: ResolverTypeWrapper<GetOrCreateUserResponse>;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  MutationResponse: ResolversParentTypes['GetOrCreateUserResponse'];
  UserProfile: UserProfile;
  ID: Scalars['ID'];
  User: User;
  Auth0User: Auth0User;
  GetOrCreateUserFromAuthDataInput: GetOrCreateUserFromAuthDataInput;
  GetUserInput: GetUserInput;
  GetOrCreateUserResponse: GetOrCreateUserResponse;
  Query: {};
  Mutation: {};
  CacheControlScope: CacheControlScope;
  Upload: Scalars['Upload'];
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'GetOrCreateUserResponse', ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>;
  subId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Auth0UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth0User'] = ResolversParentTypes['Auth0User']> = {
  sub?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type GetOrCreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetOrCreateUserResponse'] = ResolversParentTypes['GetOrCreateUserResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, never>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  getOrCreateUserFromAuthData?: Resolver<ResolversTypes['GetOrCreateUserResponse'], ParentType, ContextType, RequireFields<MutationGetOrCreateUserFromAuthDataArgs, 'authData'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  MutationResponse?: MutationResponseResolvers;
  UserProfile?: UserProfileResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Auth0User?: Auth0UserResolvers<ContextType>;
  GetOrCreateUserResponse?: GetOrCreateUserResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
