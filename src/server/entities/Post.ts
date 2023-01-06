import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Comment } from '.';
import { User } from '.';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  caption!: string;

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  userId!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location!: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.posts)
  user?: User;

  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  reactions?: Number[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
