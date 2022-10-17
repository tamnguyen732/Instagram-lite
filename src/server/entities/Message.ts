import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  conversationId!: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ default: 0 })
  seen!: boolean;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
