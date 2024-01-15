import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { ParseWordListPipe } from './words.pipes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordNode } from './words.entities';

@Module({
  imports: [TypeOrmModule.forFeature([WordNode])],
  controllers: [WordsController],
  providers: [WordsService, ParseWordListPipe],
})
export class WordsModule {}
