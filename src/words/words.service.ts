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

  getMedian = async (): Promise<number> => {
    const words = await this.wordNodeRepository.find();
    const sortedFrequencies = this.calculateSortedFrequencies(words);
    const length = sortedFrequencies.length;

    if (length % 2 === 0) {
      const middle1 = sortedFrequencies[length / 2 - 1];
      const middle2 = sortedFrequencies[length / 2];
      return (middle1 + middle2) / 2;
    } else {
      return sortedFrequencies[Math.floor(length / 2)];
    }
  };

  getTopFive = async (): Promise<WordNode[]> => {
    const words = await this.wordNodeRepository.find();
    const wordsDict = this.convertAllWordsToDict(words);
    const sortedWords = this.calculateSortedWords(wordsDict);
    return sortedWords.slice(0, 5).map((word) => {
      return {
        word,
        frequency: wordsDict[word],
      };
    });
  };

  getLeast = async (): Promise<number> => {
    const words = await this.wordNodeRepository.find();
    const sortedFrequencies = this.calculateSortedFrequencies(words);
    return sortedFrequencies[0];
  };

  private calculateSortedFrequencies = (words: Word[]): number[] => {
    return words.map(({ frequency }) => frequency).sort((a, b) => a - b);
  };

  private calculateSortedWords = (wordsDict: {
    [key: string]: number;
  }): string[] => {
    return Object.keys(wordsDict).sort((a, b): number => {
      return wordsDict[b] - wordsDict[a];
    });
  };

  private convertAllWordsToDict = (
    words: Word[],
  ): { [key: string]: number } => {
    const wordsDict = {};
    words.forEach((word) => {
      wordsDict[word.word] = word.frequency;
    });
    return wordsDict;
  };
}
