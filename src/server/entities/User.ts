import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conversation } from './Conversation';
import { Post } from '.';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  account?: string;

  @Field(() => [Conversation], { nullable: true })
  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversation!: Conversation[];

  @Field(() => [Post], { defaultValue: [] })
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @Field(() => [User], { defaultValue: [] })
  @Column('jsonb', { nullable: true, default: [] })
  followers!: User[];

  @Field(() => [User], { defaultValue: [] })
  @Column('jsonb', { nullable: true, default: [] })
  following!: User[];
}
