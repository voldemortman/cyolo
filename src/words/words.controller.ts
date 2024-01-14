import { Body, Controller, Get, Post } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  private statsActions: {
    [key: string]: () => number | { [key: string]: number }[];
  } = {};
  constructor(private wordsService: WordsService) {
    this.statsActions['top'] = this.wordsService.getTopFive;
    this.statsActions['median'] = this.wordsService.getMedian;
    this.statsActions['least'] = this.wordsService.getLeast;
  }

  @Post()
  async PostWords(@Body() words: string[]) {
    this.wordsService.addWords(words);
  }

  @Get()
  async GetStats(@Body() statsType: string) {
    return this.statsActions[statsType]();
  }
}
