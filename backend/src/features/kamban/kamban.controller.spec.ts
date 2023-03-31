import { Test } from '@nestjs/testing';

import { KambanController } from './kamban.controller';
import { KambanService } from './kamban.service';

describe('KambanController', () => {
  let controller: KambanController;
  let service: KambanService;

  const mockService = {
    create: jest.fn((dto) => ({
      id: 'asdasd',
      ...dto,
    })),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [KambanController],
      providers: [KambanService],
    })
      .overrideProvider(KambanService)
      .useValue(mockService)
      .compile();

    service = moduleRef.get<KambanService>(KambanService);
    controller = moduleRef.get<KambanController>(KambanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a kamban entry', async () => {
    expect(
      await controller.create({
        name: 'teste 1',
      }),
    ).toEqual({
      id: expect.any(String),
      name: 'teste 1',
    });
  });
});
