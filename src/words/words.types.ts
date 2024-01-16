import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type WordNode = {
  word: string;
  frequency: number;
};

export type StatsResults = number | WordNode[];

export enum StatsType {
  Top = 'Top',
  Median = 'Median',
  Least = 'Least',
}

export class GetStatsDTO {
  @ApiProperty({ name: 'statsType', enum: StatsType })
  @IsEnum(StatsType)
  statsType: StatsType;
}

export class PostWordsDTO {
  @ApiProperty()
  @IsString()
  words: string;
}
