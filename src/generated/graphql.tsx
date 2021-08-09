import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChartData = {
  __typename?: 'ChartData';
  alias: Scalars['String'];
  hits: Scalars['Float'];
};

export type CreateLinkInput = {
  link: Scalars['String'];
  alias?: Maybe<Scalars['String']>;
};


export type FilterInput = {
  field?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  link: Scalars['String'];
  alias: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  deleteLink: Scalars['Boolean'];
  createUser: User;
  updateUser?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateLinkArgs = {
  values: CreateLinkInput;
};


export type MutationDeleteLinkArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  values: SignupInput;
};


export type MutationUpdateUserArgs = {
  value: Scalars['String'];
  key: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getLink?: Maybe<Scalars['String']>;
  getMyLinksCount: Scalars['Float'];
  getMyHitsCount: Scalars['Float'];
  getMyLastHitTime?: Maybe<Scalars['DateTime']>;
  getChartData: Array<ChartData>;
  getTableData: Array<TableData>;
  users?: Maybe<Array<User>>;
  me?: Maybe<User>;
};


export type QueryGetLinkArgs = {
  url: Scalars['String'];
};


export type QueryGetTableDataArgs = {
  filter?: Maybe<FilterInput>;
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type SignupInput = {
  name: Scalars['String'];
  email: Scalars['String'];
};

export type TableData = {
  __typename?: 'TableData';
  id: Scalars['ID'];
  link: Scalars['String'];
  alias: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  user: User;
  numberOfHits?: Maybe<Scalars['String']>;
  lastHit?: Maybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  isActive: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type CreateLinkMutationVariables = Exact<{
  link: Scalars['String'];
  alias?: Maybe<Scalars['String']>;
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'alias' | 'link' | 'createdAt'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'avatar' | 'createdAt'>
  ) }
);

export type DeleteLinkMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLink'>
);

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type UpdateUserMutationVariables = Exact<{
  key: Scalars['String'];
  value: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'avatar' | 'isActive'>
  )> }
);

export type LinksDataQueryVariables = Exact<{ [key: string]: never; }>;


export type LinksDataQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getMyLinksCount' | 'getMyHitsCount' | 'getMyLastHitTime'>
  & { getChartData: Array<(
    { __typename?: 'ChartData' }
    & Pick<ChartData, 'alias' | 'hits'>
  )> }
);

export type TableDataQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
}>;


export type TableDataQuery = (
  { __typename?: 'Query' }
  & { getTableData: Array<(
    { __typename?: 'TableData' }
    & Pick<TableData, 'id' | 'alias' | 'link' | 'createdAt' | 'numberOfHits' | 'lastHit'>
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar' | 'isActive'>
  )> }
);


export const CreateLinkDocument = gql`
    mutation createLink($link: String!, $alias: String) {
  createLink(values: {alias: $alias, link: $link}) {
    id
    alias
    link
    createdAt
  }
}
    `;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      link: // value for 'link'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!) {
  createUser(values: {name: $name, email: $email}) {
    id
    name
    email
    avatar
    createdAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($id: String!) {
  deleteLink(id: $id)
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, options);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($key: String!, $value: String!) {
  updateUser(key: $key, value: $value) {
    id
    name
    email
    avatar
    isActive
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      key: // value for 'key'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const LinksDataDocument = gql`
    query LinksData {
  getMyLinksCount
  getMyHitsCount
  getMyLastHitTime
  getChartData {
    alias
    hits
  }
}
    `;

/**
 * __useLinksDataQuery__
 *
 * To run a query within a React component, call `useLinksDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useLinksDataQuery(baseOptions?: Apollo.QueryHookOptions<LinksDataQuery, LinksDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksDataQuery, LinksDataQueryVariables>(LinksDataDocument, options);
      }
export function useLinksDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksDataQuery, LinksDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksDataQuery, LinksDataQueryVariables>(LinksDataDocument, options);
        }
export type LinksDataQueryHookResult = ReturnType<typeof useLinksDataQuery>;
export type LinksDataLazyQueryHookResult = ReturnType<typeof useLinksDataLazyQuery>;
export type LinksDataQueryResult = Apollo.QueryResult<LinksDataQuery, LinksDataQueryVariables>;
export const TableDataDocument = gql`
    query TableData($limit: Int!, $offset: Int, $filter: FilterInput) {
  getTableData(limit: $limit, offset: $offset, filter: $filter) {
    id
    alias
    link
    createdAt
    numberOfHits
    lastHit
  }
}
    `;

/**
 * __useTableDataQuery__
 *
 * To run a query within a React component, call `useTableDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTableDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTableDataQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTableDataQuery(baseOptions: Apollo.QueryHookOptions<TableDataQuery, TableDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TableDataQuery, TableDataQueryVariables>(TableDataDocument, options);
      }
export function useTableDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TableDataQuery, TableDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TableDataQuery, TableDataQueryVariables>(TableDataDocument, options);
        }
export type TableDataQueryHookResult = ReturnType<typeof useTableDataQuery>;
export type TableDataLazyQueryHookResult = ReturnType<typeof useTableDataLazyQuery>;
export type TableDataQueryResult = Apollo.QueryResult<TableDataQuery, TableDataQueryVariables>;
export const UserDocument = gql`
    query User {
  me {
    id
    name
    avatar
    isActive
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;