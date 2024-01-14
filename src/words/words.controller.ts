import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('words')
export class WordsController {
  @Post()
  async PostWords(@Body() words: string[]) {
    return `Unimplemented ${words}`;
  }

  @Get()
  async GetStats(@Body() statsType: string) {
    return `Unimplemented ${statsType}`;
  }
}
