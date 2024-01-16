import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  word: string;

  @Column()
  frequency: number;
}
