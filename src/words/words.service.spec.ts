import { Test, TestingModule } from '@nestjs/testing';
import { WordsService } from './words.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Word } from './words.entities';

describe('WordsService', () => {
  let service: WordsService;
  let repository: Repository<Word>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordsService,
        {
          provide: getRepositoryToken(Word),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WordsService>(WordsService);
    repository = module.get<Repository<Word>>(getRepositoryToken(Word));
  });

  describe('addWords', () => {
    it('should add words with correct frequency', async () => {
      const findOneSpy = jest.spyOn(repository, 'findOne');
      const saveSpy = jest.spyOn(repository, 'save');

      await service.addWords(['word1', 'word2', 'word3']);

      expect(findOneSpy).toHaveBeenCalledTimes(3);
      expect(saveSpy).toHaveBeenCalledTimes(3);
      expect(saveSpy).toHaveBeenCalledWith({ word: 'word1', frequency: 1 });
      expect(saveSpy).toHaveBeenCalledWith({ word: 'word2', frequency: 1 });
      expect(saveSpy).toHaveBeenCalledWith({ word: 'word3', frequency: 1 });
    });

    it('should update frequency for existing words', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce({ word: 'existingWord', frequency: 5 });

      const findOneSpy = jest.spyOn(repository, 'findOne');
      const saveSpy = jest.spyOn(repository, 'save');

      await service.addWords(['existingWord']);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith({
        word: 'existingWord',
        frequency: 6,
      });
    });
  });

  describe('getMedian', () => {
    it('should calculate the correct median for even length', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce([
          { word: 'word1', frequency: 2 },
          { word: 'word2', frequency: 4 },
          { word: 'word3', frequency: 6 },
          { word: 'word4', frequency: 8 },
        ]);

      const median = await service.getMedian();

      expect(median).toBe(5);
    });

    it('should calculate the correct median for odd length', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce([
          { word: 'word1', frequency: 2 },
          { word: 'word2', frequency: 4 },
          { word: 'word3', frequency: 6 },
        ]);

      const median = await service.getMedian();

      expect(median).toBe(4);
    });
  });

  describe('getTopFive', () => {
    it('should return the top five words with frequencies', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce([
          { word: 'word1', frequency: 2 },
          { word: 'word2', frequency: 4 },
          { word: 'word3', frequency: 6 },
          { word: 'word4', frequency: 8 },
          { word: 'word5', frequency: 10 },
          { word: 'word6', frequency: 12 },
        ]);

      const topFive = await service.getTopFive();

      expect(topFive).toEqual([
        { word: 'word6', frequency: 12 },
        { word: 'word5', frequency: 10 },
        { word: 'word4', frequency: 8 },
        { word: 'word3', frequency: 6 },
        { word: 'word2', frequency: 4 },
      ]);
    });
  });

  describe('getLeast', () => {
    it('should return the least frequency', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValueOnce([
          { word: 'word1', frequency: 2 },
          { word: 'word2', frequency: 4 },
          { word: 'word3', frequency: 6 },
        ]);

      const leastFrequency = await service.getLeast();

      expect(leastFrequency).toBe(2);
    });
  });
});
