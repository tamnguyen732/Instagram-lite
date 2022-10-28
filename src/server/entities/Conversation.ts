import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '.';

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field((_type) => ID, { nullable: true })
  @Column({ nullable: true })
  userId!: number;

  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  members?: Number[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.conversation)
  user!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
