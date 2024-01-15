import { WordNode } from './words.entities';

export type StatsResults = number | WordNode[];

export enum StatsType {
  Top,
  Median,
  Least,
}
