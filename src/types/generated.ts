import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['Float'];
  reactions?: Maybe<Array<Scalars['Float']>>;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['ID']>;
};

export type CommentMutationResponse = {
  __typename?: 'CommentMutationResponse';
  code: Scalars['Float'];
  comments?: Maybe<Array<Comment>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  code: Scalars['Float'];
  comment?: Maybe<Comment>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  members?: Maybe<Array<Scalars['Float']>>;
  messages?: Maybe<Array<Message>>;
  receiverId?: Maybe<Scalars['ID']>;
  user: User;
  userId?: Maybe<Scalars['ID']>;
};

export type ConversationResponse = {
  __typename?: 'ConversationResponse';
  code: Scalars['Float'];
  conversation?: Maybe<Conversation>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type CreateCommentInput = {
  postId: Scalars['Float'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  caption: Scalars['String'];
  photo: Scalars['String'];
  userId: Scalars['Float'];
};

export type DeleteCommentInput = {
  commentId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type DeletePostInput = {
  postId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FindUsersInput = {
  limitPerPage: Scalars['Float'];
  page: Scalars['Float'];
  searchQuery: Scalars['String'];
};

export type FollowUserInput = {
  id: Scalars['Float'];
  type: Scalars['String'];
};

export type GetMessagesInput = {
  conversationId: Scalars['Float'];
  limitPerPage: Scalars['Float'];
  page: Scalars['Float'];
};

export type GetSessionResponse = {
  __typename?: 'GetSessionResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  conversation: Conversation;
  conversationId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  receiverMessageId: Scalars['ID'];
  seen: Scalars['Boolean'];
  text: Scalars['String'];
  userId?: Maybe<Scalars['ID']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  newMessage?: Maybe<Message>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: BaseResponse;
  createComment: CommentMutationResponse;
  createConversation: ConversationResponse;
  createMessage: MessageResponse;
  createPost: PostMutationResponse;
  deleteComment: CommentResponse;
  deleteConversation: ConversationResponse;
  deletePost: PostResponse;
  followUser: UserMutationResponse;
  forgotPassword: BaseResponse;
  login: UserMutationResponse;
  loginFacebook: UserMutationResponse;
  logout: BaseResponse;
  reactToComment: BaseResponse;
  reactToPost: BaseResponse;
  register: UserMutationResponse;
  seenMessage: BaseResponse;
  updateComment: PostResponse;
  updatePost: PostResponse;
  uploadAvatar: BaseResponse;
  verifiedUser: BaseResponse;
};


export type MutationChangePasswordArgs = {
  changePassword: ChangePasswordInput;
};


export type MutationCreateCommentArgs = {
  createCommentArg: CreateCommentInput;
};


export type MutationCreateConversationArgs = {
  receiverId: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  conversationId: Scalars['Float'];
  receiverId: Scalars['Float'];
  text: Scalars['String'];
};


export type MutationCreatePostArgs = {
  createPostArg: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  deleteCommentArg: DeleteCommentInput;
};


export type MutationDeleteConversationArgs = {
  conversationId: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  postId: DeletePostInput;
};


export type MutationFollowUserArgs = {
  followUserArg: FollowUserInput;
};


export type MutationForgotPasswordArgs = {
  forgotPassword: Scalars['String'];
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationLoginFacebookArgs = {
  accessToken: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationReactToCommentArgs = {
  commentId: Scalars['Float'];
  reaction?: InputMaybe<Scalars['String']>;
};


export type MutationReactToPostArgs = {
  postId: Scalars['Float'];
  reaction?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  register: RegisterInput;
};


export type MutationSeenMessageArgs = {
  messageId: Scalars['Float'];
};


export type MutationUpdateCommentArgs = {
  updateCommentArg: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  updatePostArg: UpdatePostInput;
};


export type MutationUploadAvatarArgs = {
  image: Scalars['Int'];
};


export type MutationVerifiedUserArgs = {
  verifyUser: Scalars['String'];
};

export type PaginatedConversationResponse = {
  __typename?: 'PaginatedConversationResponse';
  code: Scalars['Float'];
  hasMore?: Maybe<Scalars['Boolean']>;
  lastPage?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  paginatedConversations?: Maybe<Array<Conversation>>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginatedMessageResponse = {
  __typename?: 'PaginatedMessageResponse';
  code: Scalars['Float'];
  hasMore?: Maybe<Scalars['Boolean']>;
  lastPage?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  paginatedMessages?: Maybe<Array<Message>>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginatedPostsResponse = {
  __typename?: 'PaginatedPostsResponse';
  code: Scalars['Float'];
  hasMore?: Maybe<Scalars['Boolean']>;
  lastPage?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  paginatedPosts?: Maybe<Array<Post>>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type PaginatedUsersResponse = {
  __typename?: 'PaginatedUsersResponse';
  code: Scalars['Float'];
  hasMore?: Maybe<Scalars['Boolean']>;
  lastPage?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  paginatedUsers?: Maybe<Array<User>>;
  success: Scalars['Boolean'];
  totalCount?: Maybe<Scalars['Float']>;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  photo?: Maybe<Scalars['String']>;
  reactions?: Maybe<Array<Scalars['Float']>>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  success: Scalars['Boolean'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  findUsers: PaginatedUsersResponse;
  getAllPosts: PaginatedPostsResponse;
  getConversationById: ConversationResponse;
  getConversations: PaginatedConversationResponse;
  getMessages: PaginatedMessageResponse;
  getSession: GetSessionResponse;
  getSinglePost: PostResponse;
  getSingleUser: UserResponse;
  getUsers: PaginatedUsersResponse;
  getYourPosts: PaginatedPostsResponse;
  hello: Scalars['String'];
  lastMessage: Message;
};


export type QueryFindUsersArgs = {
  query: FindUsersInput;
};


export type QueryGetAllPostsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Float'];
};


export type QueryGetConversationByIdArgs = {
  conversationId: Scalars['Float'];
};


export type QueryGetConversationsArgs = {
  limitPage: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetMessagesArgs = {
  getMessageInput: GetMessagesInput;
};


export type QueryGetSinglePostArgs = {
  postId: Scalars['Float'];
};


export type QueryGetSingleUserArgs = {
  username: Scalars['String'];
};


export type QueryGetUsersArgs = {
  limitPerPage: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetYourPostsArgs = {
  limit: Scalars['Int'];
  page: Scalars['Float'];
};


export type QueryLastMessageArgs = {
  conversationId: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  verifyCode: Scalars['Float'];
};

export type UpdateCommentInput = {
  commentId: Scalars['Float'];
  text: Scalars['String'];
  userId: Scalars['Float'];
};

export type UpdatePostInput = {
  caption: Scalars['String'];
  photo: Scalars['String'];
  postId: Scalars['Float'];
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  account?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  conversation?: Maybe<Array<Conversation>>;
  email: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<User>>;
  id: Scalars['ID'];
  posts?: Maybe<Array<Post>>;
  username: Scalars['String'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  code: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['Float'];
};

export type BaseResponseFragment = { __typename?: 'BaseResponse', code: number, message?: string | null, success: boolean };

export type PostFragment = { __typename?: 'Post', id: string, photo?: string | null, caption?: string | null };

export type BaseUserFragment = { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null };

export type UserFragment = { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, message?: string | null, success: boolean, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'BaseResponse', code: number, message?: string | null, success: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  forgotPassword: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'BaseResponse', code: number, message?: string | null, success: boolean } };

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', accessToken?: string | null, code: number, message?: string | null, success: boolean, user?: { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, conversation?: Array<{ __typename?: 'Conversation', receiverId?: string | null }> | null, posts?: Array<{ __typename?: 'Post', photo?: string | null, caption?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginFacebookMutationVariables = Exact<{
  accessToken: Scalars['String'];
  userId: Scalars['String'];
}>;


export type LoginFacebookMutation = { __typename?: 'Mutation', loginFacebook: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'BaseResponse', code: number, message?: string | null, success: boolean } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, message?: string | null, success: boolean, user?: { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type VerifiedUserMutationVariables = Exact<{
  verifyUser: Scalars['String'];
}>;


export type VerifiedUserMutation = { __typename?: 'Mutation', verifiedUser: { __typename?: 'BaseResponse', code: number, message?: string | null, success: boolean } };

export type FollowUserMutationVariables = Exact<{
  FollowUserInput: FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null } };

export type GetSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSessionQuery = { __typename?: 'Query', getSession: { __typename?: 'GetSessionResponse', code: number, success: boolean, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, conversation?: Array<{ __typename?: 'Conversation', userId?: string | null, receiverId?: string | null }> | null, posts?: Array<{ __typename?: 'Post', photo?: string | null, caption?: string | null }> | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null }> | null } | null } };

export type FindUsersQueryVariables = Exact<{
  FindUsersInput: FindUsersInput;
}>;


export type FindUsersQuery = { __typename?: 'Query', findUsers: { __typename?: 'PaginatedUsersResponse', code: number, success: boolean, totalCount?: number | null, page?: number | null, lastPage?: number | null, hasMore?: boolean | null, paginatedUsers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null }> | null } };

export type GetSingleUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetSingleUserQuery = { __typename?: 'Query', getSingleUser: { __typename?: 'UserResponse', code: number, success: boolean, user?: { __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null } | null } };

export type GetUsersQueryVariables = Exact<{
  page: Scalars['Float'];
  limitPerPage: Scalars['Float'];
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'PaginatedUsersResponse', code: number, success: boolean, hasMore?: boolean | null, lastPage?: number | null, totalCount?: number | null, paginatedUsers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null, followers?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, following?: Array<{ __typename?: 'User', id: string, email: string, username: string, avatar?: string | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, photo?: string | null, caption?: string | null }> | null }> | null } };

export const BaseResponseFragmentDoc = gql`
    fragment BaseResponse on BaseResponse {
  code
  message
  success
}
    `;
export const BaseUserFragmentDoc = gql`
    fragment baseUser on User {
  id
  email
  username
  avatar
}
    `;
export const PostFragmentDoc = gql`
    fragment post on Post {
  id
  photo
  caption
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  ...baseUser
  followers {
    ...baseUser
  }
  following {
    ...baseUser
  }
  posts {
    ...post
  }
}
    ${BaseUserFragmentDoc}
${PostFragmentDoc}`;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  code
  message
  success
  errors {
    field
    message
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: changePasswordInput!) {
  changePassword(changePassword: $changePasswordInput) {
    ...BaseResponse
  }
}
    ${BaseResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($forgotPassword: String!) {
  forgotPassword(forgotPassword: $forgotPassword) {
    ...BaseResponse
  }
}
    ${BaseResponseFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      forgotPassword: // value for 'forgotPassword'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($LoginInput: LoginInput!) {
  login(login: $LoginInput) {
    ...userMutationResponse
    user {
      ...baseUser
      conversation {
        receiverId
      }
      posts {
        photo
        caption
      }
      following {
        ...baseUser
      }
      followers {
        ...baseUser
      }
    }
    accessToken
  }
}
    ${UserMutationResponseFragmentDoc}
${BaseUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      LoginInput: // value for 'LoginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginFacebookDocument = gql`
    mutation LoginFacebook($accessToken: String!, $userId: String!) {
  loginFacebook(accessToken: $accessToken, userId: $userId) {
    code
    success
    message
  }
}
    `;
export type LoginFacebookMutationFn = Apollo.MutationFunction<LoginFacebookMutation, LoginFacebookMutationVariables>;

/**
 * __useLoginFacebookMutation__
 *
 * To run a mutation, you first call `useLoginFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginFacebookMutation, { data, loading, error }] = useLoginFacebookMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLoginFacebookMutation(baseOptions?: Apollo.MutationHookOptions<LoginFacebookMutation, LoginFacebookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginFacebookMutation, LoginFacebookMutationVariables>(LoginFacebookDocument, options);
      }
export type LoginFacebookMutationHookResult = ReturnType<typeof useLoginFacebookMutation>;
export type LoginFacebookMutationResult = Apollo.MutationResult<LoginFacebookMutation>;
export type LoginFacebookMutationOptions = Apollo.BaseMutationOptions<LoginFacebookMutation, LoginFacebookMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ...BaseResponse
  }
}
    ${BaseResponseFragmentDoc}`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(register: $registerInput) {
    ...userMutationResponse
    user {
      ...baseUser
    }
  }
}
    ${UserMutationResponseFragmentDoc}
${BaseUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VerifiedUserDocument = gql`
    mutation VerifiedUser($verifyUser: String!) {
  verifiedUser(verifyUser: $verifyUser) {
    ...BaseResponse
  }
}
    ${BaseResponseFragmentDoc}`;
export type VerifiedUserMutationFn = Apollo.MutationFunction<VerifiedUserMutation, VerifiedUserMutationVariables>;

/**
 * __useVerifiedUserMutation__
 *
 * To run a mutation, you first call `useVerifiedUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifiedUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifiedUserMutation, { data, loading, error }] = useVerifiedUserMutation({
 *   variables: {
 *      verifyUser: // value for 'verifyUser'
 *   },
 * });
 */
export function useVerifiedUserMutation(baseOptions?: Apollo.MutationHookOptions<VerifiedUserMutation, VerifiedUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifiedUserMutation, VerifiedUserMutationVariables>(VerifiedUserDocument, options);
      }
export type VerifiedUserMutationHookResult = ReturnType<typeof useVerifiedUserMutation>;
export type VerifiedUserMutationResult = Apollo.MutationResult<VerifiedUserMutation>;
export type VerifiedUserMutationOptions = Apollo.BaseMutationOptions<VerifiedUserMutation, VerifiedUserMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($FollowUserInput: FollowUserInput!) {
  followUser(followUserArg: $FollowUserInput) {
    code
    success
    message
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      FollowUserInput: // value for 'FollowUserInput'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetSessionDocument = gql`
    query GetSession {
  getSession {
    code
    success
    user {
      ...baseUser
      conversation {
        userId
        receiverId
      }
      posts {
        photo
        caption
      }
      followers {
        ...user
      }
      following {
        ...user
      }
    }
    accessToken
  }
}
    ${BaseUserFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, options);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const FindUsersDocument = gql`
    query findUsers($FindUsersInput: FindUsersInput!) {
  findUsers(query: $FindUsersInput) {
    code
    success
    totalCount
    page
    lastPage
    hasMore
    paginatedUsers {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useFindUsersQuery__
 *
 * To run a query within a React component, call `useFindUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUsersQuery({
 *   variables: {
 *      FindUsersInput: // value for 'FindUsersInput'
 *   },
 * });
 */
export function useFindUsersQuery(baseOptions: Apollo.QueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
      }
export function useFindUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
        }
export type FindUsersQueryHookResult = ReturnType<typeof useFindUsersQuery>;
export type FindUsersLazyQueryHookResult = ReturnType<typeof useFindUsersLazyQuery>;
export type FindUsersQueryResult = Apollo.QueryResult<FindUsersQuery, FindUsersQueryVariables>;
export const GetSingleUserDocument = gql`
    query getSingleUser($username: String!) {
  getSingleUser(username: $username) {
    code
    success
    user {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetSingleUserQuery__
 *
 * To run a query within a React component, call `useGetSingleUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetSingleUserQuery(baseOptions: Apollo.QueryHookOptions<GetSingleUserQuery, GetSingleUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleUserQuery, GetSingleUserQueryVariables>(GetSingleUserDocument, options);
      }
export function useGetSingleUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleUserQuery, GetSingleUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleUserQuery, GetSingleUserQueryVariables>(GetSingleUserDocument, options);
        }
export type GetSingleUserQueryHookResult = ReturnType<typeof useGetSingleUserQuery>;
export type GetSingleUserLazyQueryHookResult = ReturnType<typeof useGetSingleUserLazyQuery>;
export type GetSingleUserQueryResult = Apollo.QueryResult<GetSingleUserQuery, GetSingleUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($page: Float!, $limitPerPage: Float!) {
  getUsers(page: $page, limitPerPage: $limitPerPage) {
    code
    success
    hasMore
    lastPage
    totalCount
    paginatedUsers {
      ...user
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limitPerPage: // value for 'limitPerPage'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;