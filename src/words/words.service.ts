import { Injectable } from '@nestjs/common';
import { WordNode } from './words.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordNode)
    private wordNodeRepository: Repository<WordNode>,
  ) {}
  private readonly words: { [key: string]: number } = {};

  async addWords(words: string[]): Promise<void> {
    words.forEach(async (word) => {
      const wordNode = await this.wordNodeRepository.findOneBy({ word });
      if (wordNode) {
        wordNode.frequency++;
        this.wordNodeRepository.save(wordNode);
      } else {
        this.wordNodeRepository.save({ word, frequency: 1 });
      }
    });
  }

  async getMedian(): Promise<number> {
    const sortedFrequencies = await this.calculateSortedFrequencies();
    const length = sortedFrequencies.length;

    if (length % 2 === 0) {
      const middle1 = sortedFrequencies[length / 2 - 1];
      const middle2 = sortedFrequencies[length / 2];
      return (middle1 + middle2) / 2;
    } else {
      return sortedFrequencies[Math.floor(length / 2)];
    }
  }

  async getTopFive(): Promise<WordNode[]> {
    const sortedWords = await this.calculateSortedWords();
    return await Promise.all(
      sortedWords.slice(0, 5).map(async (word): Promise<WordNode> => {
        return await this.wordNodeRepository.findOneBy({ word });
      }),
    );
  }

  async getLeast(): Promise<number> {
    const sortedFrequencies = await this.calculateSortedFrequencies();
    return sortedFrequencies[0];
  }

  private async calculateSortedFrequencies(): Promise<number[]> {
    const words = await this.wordNodeRepository.find();
    return words.map(({ frequency }) => frequency).sort((a, b) => a - b);
  }

  private async calculateSortedWords(): Promise<string[]> {
    const words = await this.wordNodeRepository.find();
    return words
      .map(({ word }) => word)
      .sort((a, b): number => {
        return this.words[b] - this.words[a];
      });
  }
}
