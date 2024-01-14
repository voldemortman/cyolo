import { Body, Controller, Get, Post } from '@nestjs/common';
import { WordsService } from './words.service';
import { StatsResults, StatsType } from './words.types';

@Controller('words')
export class WordsController {
  private statsActions: {
    [key: number]: () => StatsResults;
  } = {};
  constructor(private wordsService: WordsService) {
    this.statsActions[StatsType.Top] = this.wordsService.getTopFive;
    this.statsActions[StatsType.Median] = this.wordsService.getMedian;
    this.statsActions[StatsType.Least] = this.wordsService.getLeast;
  }

  @Post()
  async PostWords(@Body() words: string[]): Promise<void> {
    this.wordsService.addWords(words);
  }

  @Get()
  async GetStats(@Body() statsType: StatsType): Promise<StatsResults> {
    return this.statsActions[statsType]();
  }
}
