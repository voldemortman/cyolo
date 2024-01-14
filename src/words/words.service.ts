import { Injectable } from '@nestjs/common';

@Injectable()
export class WordsService {
  private readonly words: { [key: string]: number } = {};

  addWords(words: string[]) {
    words.forEach((word) => {
      if (word in this.words) {
        this.words[word]++;
      } else {
        this.words[word] = 0;
      }
    });
  }

  getMedian(): number {
    const sortedFrequencies = this.calculateSortedFrequencies();
    const length = sortedFrequencies.length;

    if (length % 2 === 0) {
      const middle1 = sortedFrequencies[length / 2 - 1];
      const middle2 = sortedFrequencies[length / 2];
      return (middle1 + middle2) / 2;
    } else {
      return sortedFrequencies[Math.floor(length / 2)];
    }
  }

  getTopFive(): { [key: string]: number }[] {
    const sortedWords = this.calculateSortedWords();
    return sortedWords.slice(0, 5).map((word): { [key: string]: number } => {
      const wordNode = {};
      wordNode[word] = this.words[word];
      return wordNode;
    });
  }

  getLeast(): number {
    const sortedFrequencies = this.calculateSortedFrequencies();
    return sortedFrequencies[0];
  }

  private calculateSortedFrequencies(): number[] {
    return Object.values(this.words).sort((a, b) => a - b);
  }

  private calculateSortedWords(): string[] {
    return Object.keys(this.words).sort((a, b): number => {
      return this.words[b] - this.words[a];
    });
  }
}
