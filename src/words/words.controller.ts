import { Body, Controller, Get, Post } from '@nestjs/common';
import { WordsService } from './words.service';
import { StatsResults } from './words.types';

@Controller('words')
export class WordsController {
  private statsActions: {
    [key: string]: () => StatsResults;
  } = {};
  constructor(private wordsService: WordsService) {
    this.statsActions['top'] = this.wordsService.getTopFive;
    this.statsActions['median'] = this.wordsService.getMedian;
    this.statsActions['least'] = this.wordsService.getLeast;
  }

  @Post()
  async PostWords(@Body() words: string[]): Promise<void> {
    this.wordsService.addWords(words);
  }

  @Get()
  async GetStats(@Body() statsType: string): Promise<StatsResults> {
    return this.statsActions[statsType]();
  }
}
