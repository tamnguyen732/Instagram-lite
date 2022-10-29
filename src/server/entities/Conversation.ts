import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User, Message } from '.';

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  userId!: number;

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  receiverId?: number;

  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  members?: Number[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.conversation)
  user!: User;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.conversation, { onDelete: 'CASCADE' })
  messages!: Message[];

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
