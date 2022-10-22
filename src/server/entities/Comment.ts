import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '.';
import { Post } from '.';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  postId!: number;

  @Field()
  @Column()
  text!: string;

  @Field(() => [User])
  @Column('jsonb', { array: true, nullable: true })
  reactions!: User[];

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
