import { Conversation, Message, Post, User } from '../entities';

export * from './MyContext';
export * from '../../types/utils';
export type EntityType = Post[] | User[] | Conversation[] | Message[];
