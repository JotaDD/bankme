import { Test, TestingModule } from '@nestjs/testing';
import { AssignorsService } from './assignors.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import {
  mockAssignorList,
  mockAssignorsService,
  mockCreateAssignorDto,
  mockUpdateAssignorDto,
} from './tests/mocks';
import { UpdateAssignorDto } from './dto/update-assignor.dto';

describe('AssignorsService', () => {
  let service: AssignorsService;

  let prismaServiceMock = {
    provide: PrismaService,
    useValue: {
      assignor: {
        create: jest.fn().mockResolvedValue({
          id: uuid(),
          ...mockCreateAssignorDto,
        }),
        findMany: jest.fn().mockResolvedValue(mockAssignorList),
        findUnique: jest.fn().mockResolvedValue(mockAssignorList[0]),
        update: jest.fn().mockResolvedValue({
          id: uuid(),
          ...mockUpdateAssignorDto,
        }),
        delete: jest.fn().mockResolvedValue(mockAssignorList[0]),
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorsService, prismaServiceMock],
    }).compile();

    service = module.get<AssignorsService>(AssignorsService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create a new assignor', async () => {
      const response = {
        id: uuid(),
        ...mockCreateAssignorDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(response);

      const result = await service.create(mockCreateAssignorDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateAssignorDto);
      expect(result).toEqual(response);
    });
  });

  // describe('create', () => {
  //   it('should create a new assignor', async () => {
  //     const response = {
  //       id: uuid(),
  //       ...mockCreateAssignorDto,
  //     };

  //     jest.spyOn(service, 'create').mockResolvedValue(response);

  //     const result = await service.create(mockCreateAssignorDto);

  //     expect(service.create).toHaveBeenCalledWith(mockCreateAssignorDto);
  //     expect(result).toEqual(response);
  //   });
  // });

  // describe('findAll', () => {
  //   it('should return all assignors', async () => {
  //     jest.spyOn(service, 'findAll').mockResolvedValue(mockAssignorList);

  //     const result = await service.findAll();

  //     expect(service.findAll).toHaveBeenCalled();
  //     expect(result).toEqual(mockAssignorList);
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return an assignor by id', async () => {
  //     const id = mockAssignorList[0].id;
  //     const assignor = mockAssignorList[0];

  //     jest.spyOn(service, 'findOne').mockResolvedValue(assignor);

  //     const result = await service.findOne(id);

  //     expect(service.findOne).toHaveBeenCalledWith(id);
  //     expect(result).toEqual(assignor);
  //   });
  // });

  // describe('update', () => {
  //   it('should update an assignor by id', async () => {
  //     const id = mockAssignorList[0].id;

  //     const updatedAssignor = await service.update(id, mockUpdateAssignorDto);

  //     jest.spyOn(service, 'update').mockResolvedValue(updatedAssignor);

  //     const result = await service.update(id, updatedAssignor);

  //     expect(service.update).toHaveBeenCalledWith(id, updatedAssignor);
  //     expect(result).toEqual({
  //       id,
  //       ...mockUpdateAssignorDto,
  //     } as UpdateAssignorDto);
  //   });
  // });

  // describe('remove', () => {
  //   it('should remove an assignor by id', async () => {
  //     const id = mockAssignorList[0].id;
  //     const assignor = mockAssignorList[0];

  //     const removedAssignor = await service.remove(id);

  //     jest.spyOn(service, 'remove').mockResolvedValue(assignor);

  //     expect(service.remove).toHaveBeenCalledWith(id);
  //     expect(removedAssignor).toEqual(assignor);
  //   });
  // });
});
