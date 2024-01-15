import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WordNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  word: string;

  @Column()
  frequency: number;
}
