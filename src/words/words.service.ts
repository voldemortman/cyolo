import { Injectable } from '@nestjs/common';
import { Word } from './words.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordNode } from './words.types';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word)
    private wordNodeRepository: Repository<Word>,
  ) {}

  async addWords(words: string[]): Promise<void> {
    for (const word of words) {
      const wordNode = await this.wordNodeRepository.findOne({
        where: { word: word },
      });
      if (wordNode) {
        wordNode.frequency++;
        await this.wordNodeRepository.save(wordNode);
      } else {
        await this.wordNodeRepository.save({ word, frequency: 1 });
      }
    }
  }

  getTopFive = async (): Promise<WordNode[]> => {
    const words = await this.wordNodeRepository.find({
      order: {
        frequency: 'DESC',
      },
    });
    return words.slice(0, 5).map(({ word, frequency }) => {
      return { word, frequency };
    });
  };

  getMedian = async (): Promise<number> => {
    const words = await this.wordNodeRepository.find({
      order: {
        frequency: 'ASC',
      },
    });
    const length = words.length;

    if (length % 2 === 0) {
      const middle1 = words[length / 2 - 1].frequency;
      const middle2 = words[length / 2].frequency;
      return (middle1 + middle2) / 2;
    } else {
      return words[Math.floor(length / 2)].frequency;
    }
  };

  getLeast = async (): Promise<number> => {
    const words = await this.wordNodeRepository.find({
      order: {
        frequency: 'ASC',
      },
    });
    return words[0].frequency;
  };
}
