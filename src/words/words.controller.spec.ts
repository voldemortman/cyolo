import { Test, TestingModule } from '@nestjs/testing';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { GetStatsDTO, StatsType } from './words.types';

describe('WordsController', () => {
  let controller: WordsController;
  let wordsService: WordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [WordsService],
    }).compile();

    controller = module.get<WordsController>(WordsController);
    wordsService = module.get<WordsService>(WordsService);
  });

  describe('PostWords', () => {
    it('should add words to the service', async () => {
      const addWordsSpy = jest.spyOn(wordsService, 'addWords');
      const words: string[] = ['word1', 'word2', 'word3'] ;

      await controller.PostWords(words);

      expect(addWordsSpy).toHaveBeenCalledWith(words);
    });
  });

  describe('GetStats', () => {
    it('should call the corresponding stats action for Top', async () => {
      const getTopFiveSpy = jest.spyOn(wordsService, 'getTopFive');
      const query: GetStatsDTO = { statsType: StatsType.Top };

      await controller.GetStats(query);

      expect(getTopFiveSpy).toHaveBeenCalled();
    });

    it('should call the corresponding stats action for Median', async () => {
      const getMedianSpy = jest.spyOn(wordsService, 'getMedian');
      const query: GetStatsDTO = { statsType: StatsType.Median };

      await controller.GetStats(query);

      expect(getMedianSpy).toHaveBeenCalled();
    });

    it('should call the corresponding stats action for Least', async () => {
      const getLeastSpy = jest.spyOn(wordsService, 'getLeast');
      const query: GetStatsDTO = { statsType: StatsType.Least };

      await controller.GetStats(query);

      expect(getLeastSpy).toHaveBeenCalled();
    });
  });
});
