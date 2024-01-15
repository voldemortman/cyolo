import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';

@Module({
  imports: [
    WordsModule,
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: ':memory:',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
