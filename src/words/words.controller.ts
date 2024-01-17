import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { WordsService } from './words.service';
import {
  GetStatsDTO,
  PostWordsDTO,
  StatsResults,
  StatsType,
} from './words.types';
import { ParseWordListPipe } from './words.pipes';
import { ApiBody } from '@nestjs/swagger';

@Controller('words')
export class WordsController {
  private statsActions: {
    [key: number]: () => Promise<StatsResults>;
  } = {};
  constructor(private wordsService: WordsService) {
    this.statsActions[StatsType.Top] = this.wordsService.getTopFive;
    this.statsActions[StatsType.Median] = this.wordsService.getMedian;
    this.statsActions[StatsType.Least] = this.wordsService.getLeast;
  }

  @Post()
  @ApiBody({
    description: 'Comma-separated string of words',
    required: true,
    type: PostWordsDTO,
    examples: {
      example1: {
        value: { words: 'word1, word2, word3' },
        summary: 'An example with multiple words',
      },
      example2: {
        value: { words: 'singleword' },
        summary: 'An example with a single word',
      },
    },
  })
  @UsePipes(ParseWordListPipe)
  PostWords(@Body() words: string[]): void {
    this.wordsService.addWords(words);
  }

  @Get()
  async GetStats(@Query() { statsType }: GetStatsDTO): Promise<StatsResults> {
    return await this.statsActions[statsType]();
  }
}
