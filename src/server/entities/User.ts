import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

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

  @Field(() => [User], { nullable: true })
  @Column('jsonb', { array: true, nullable: true })
  followers!: User[];

  @Field(() => [User], { nullable: true })
  @Column('jsonb', { array: true, nullable: true })
  following?: User[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
