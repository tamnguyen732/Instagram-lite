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

  @Field()
  @Column()
  creator!: string;

  @Field()
  @Column()
  creatorId!: string;

  @Field()
  @Column()
  members!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.conversation)
  user!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
