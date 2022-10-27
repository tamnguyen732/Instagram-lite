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
import { Post } from '.';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: true })
  postId!: number;

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  userId!: number;

  @Field()
  @Column()
  text!: string;

  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  reactions?: Number[];

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
