import { Conversation, Message, Post, User } from '../entities';

export * from './MyContext';

export type EntityType = Post[] | User[] | Conversation[] | Message[];
