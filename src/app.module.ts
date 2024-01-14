import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';

@Module({
  imports: [],
  controllers: [AppController, WordsController],
  providers: [AppService],
})
export class AppModule {}
