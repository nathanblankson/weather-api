import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './forecast.controller';

describe('Forecast Controller', () => {
  let controller: ForecastController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForecastController],
    }).compile();

    controller = module.get<ForecastController>(ForecastController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
