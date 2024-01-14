import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';
import { WordsModule } from './words/words.module';

@Module({
  imports: [WordsModule],
  controllers: [AppController, WordsController],
  providers: [AppService, WordsService],
})
export class AppModule {}
