import { MutationResponse } from '../../src/types';

enum GRAPHQL_SUCCESS_CODES {
  MUTATION_SUCCESS = 'MUTATION_SUCCESS',
}

type MutationProps<T> = {
  mutationName: string;
  payload: T;
  code?: string;
  message?: string;
  success?: boolean;
};
type MutationPayload<T> = { payload: T | null };
type MutationResponseContract<T> = MutationResponse & MutationPayload<T>;

export function createSuccessfulMutationResponse<T = unknown>({
  code = GRAPHQL_SUCCESS_CODES.MUTATION_SUCCESS,
  message,
  mutationName,
  payload,
}: MutationProps<T>): MutationResponseContract<T> {
  return {
    payload,
    success: true,
    code,
    message:
      message || `Successfully performed GraphQL mutation: ${mutationName}`,
  };
}
