export type WordNode = {
  word: string;
  frequency: number;
};

export type StatsResults = number | WordNode[];

export enum StatsType {
  Top,
  Median,
  Least,
}
