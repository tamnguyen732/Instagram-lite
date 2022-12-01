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

export type FollowUserInput = {
  id: Scalars['Float'];
  type: Scalars['String'];
};

export type GetMessagesInput = {
  conversationId: Scalars['Float'];
  limitPerPage: Scalars['Float'];
  page: Scalars['Float'];
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
  logout: BaseResponse;
  reactToComment: BaseResponse;
  reactToPost: BaseResponse;
  register: UserMutationResponse;
  seenMessage: BaseResponse;
  updateComment: PostResponse;
  updatePost: PostResponse;
  uploadAvatar: BaseResponse;
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
  getAllPosts: PaginatedPostsResponse;
  getConversationById: ConversationResponse;
  getConversations: PaginatedConversationResponse;
  getMessages: PaginatedMessageResponse;
  getSinglePost: PostResponse;
  getSingleUser: UserResponse;
  getUsers: PaginatedUsersResponse;
  getYourPosts: PaginatedPostsResponse;
  hello: Scalars['String'];
  lastMessage: Message;
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
  userId: Scalars['Float'];
};


export type QueryGetUsersArgs = {
  limit: Scalars['Int'];
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
  avatar?: Maybe<Scalars['String']>;
  conversation?: Maybe<Array<Conversation>>;
  email: Scalars['String'];
  followers?: Maybe<Array<User>>;
  following?: Maybe<Array<Scalars['Float']>>;
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
  user?: Maybe<Array<User>>;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['Float'];
};

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, accessToken?: string | null, user?: { __typename?: 'User', id: string, email: string, username: string, following?: Array<number> | null, posts?: Array<{ __typename?: 'Post', photo?: string | null, caption?: string | null }> | null } | null } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', username: string, email: string } | null } };


export const LoginDocument = gql`
    mutation Login($LoginInput: LoginInput!) {
  login(login: $LoginInput) {
    code
    success
    message
    user {
      id
      email
      username
      posts {
        photo
        caption
      }
      following
    }
    accessToken
  }
}
    `;
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
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(register: $registerInput) {
    code
    success
    message
    user {
      username
      email
    }
  }
}
    `;
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