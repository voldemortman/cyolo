import {
  Body,
  Controller,
  Get,
  ParseEnumPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { StatsResults, StatsType } from './words.types';
import { ParseWordListPipe } from './words.pipes';

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
  @UsePipes(ParseWordListPipe)
  async PostWords(@Body('words') words: string[]): Promise<void> {
    await this.wordsService.addWords(words);
  }

  @Get()
  async GetStats(
    @Body('statsType', ParseEnumPipe) statsType: StatsType,
  ): Promise<StatsResults> {
    return await this.statsActions[statsType]();
  }
}
