import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { ParseWordListPipe } from './words.pipes';

@Module({
  controllers: [WordsController],
  providers: [WordsService, ParseWordListPipe],
})
export class WordsModule {}
