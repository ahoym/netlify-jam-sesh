import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React, { createContext, useContext, useEffect } from 'react';
import { useAuth0 } from '../../auth/react-auth0-spa';
import {
  GetOrCreateUserFromAuthDataInput,
  GetOrCreateUserResponse,
  User,
} from '../../types';

export const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext)!;

const USER_QUERY = gql`
  mutation GetOrCreateUserFromAuthData(
    $authData: GetOrCreateUserFromAuthDataInput!
  ) {
    getOrCreateUserFromAuthData(authData: $authData) {
      code
      success
      message
      payload {
        id
        email
        name
        subId
      }
    }
  }
`;

export function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const { user } = useAuth0();
  const [getOrCreateUser, { data }] = useMutation<
    {
      getOrCreateUserFromAuthData: GetOrCreateUserResponse;
    },
    { authData: GetOrCreateUserFromAuthDataInput }
  >(USER_QUERY);

  useEffect(() => {
    if (user) {
      getOrCreateUser({
        variables: {
          authData: {
            email: user.email,
            name: user.name,
            nickname: user.nickname,
            sub: user.sub,
          },
        },
      });
    }
  }, [getOrCreateUser, user]);

  return (
    <UserContext.Provider
      value={data?.getOrCreateUserFromAuthData?.payload || null}
    >
      {children}
    </UserContext.Provider>
  );
}
