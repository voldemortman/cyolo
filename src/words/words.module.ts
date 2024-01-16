import { Module } from '@nestjs/common';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './words.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
