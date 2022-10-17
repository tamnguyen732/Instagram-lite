import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
