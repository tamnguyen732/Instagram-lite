import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Conversation } from '.';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  conversationId!: number;

  @Field()
  @Column()
  text!: string;
  @Column()
  @Field((_type) => ID)
  creatorMessageId!: number;

  @Column()
  @Field((_type) => ID)
  receiverMessageId!: number;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { onDelete: 'SET NULL' })
  conversation!: Conversation;

  @Field()
  @Column({ default: 0 })
  seen!: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
