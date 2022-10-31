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

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  userId!: number;

  @Column()
  @Field((_type) => ID)
  receiverMessageId!: number;

  @Field(() => Conversation)
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { onDelete: 'SET NULL' })
  conversation!: Conversation;

  @Field()
  @Column()
  seen!: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
