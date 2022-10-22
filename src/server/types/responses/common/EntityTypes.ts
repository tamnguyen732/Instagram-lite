import { Comment, Message, Post } from '~/server/entities';

export type ReactEntities = typeof Post | typeof Comment | typeof Message;
