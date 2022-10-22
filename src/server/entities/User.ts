import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
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
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => [Conversation], { nullable: true })
  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversation!: Relation<Conversation>[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @Field(() => [User], { nullable: true })
  @Column('jsonb', { array: true, nullable: true })
  followers!: User[];

  @Field(() => [User], { nullable: true })
  @Column('jsonb', { array: true, nullable: true })
  following?: User[];
}
