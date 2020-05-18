export type Maybe<T> = T | null;
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

export type HelloWorld = {
   __typename?: 'HelloWorld';
  id: Scalars['ID'];
  hello?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  setHello?: Maybe<Scalars['String']>;
};


export type MutationSetHelloArgs = {
  message?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

