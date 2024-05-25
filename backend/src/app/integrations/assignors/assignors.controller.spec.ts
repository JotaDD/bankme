import { Test, TestingModule } from '@nestjs/testing';
import { Assignor } from 'src/interfaces';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import {
  mockAssignorList,
  mockAssignorsService,
  mockCreateAssignorDto,
  mockUpdateAssignorDto,
} from './tests/mocks';

describe('AssignorsController', () => {
  let controller: AssignorsController;

  let service: AssignorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorsController],
      providers: [mockAssignorsService, PrismaService],
    }).compile();

    controller = module.get<AssignorsController>(AssignorsController);
    service = module.get<AssignorsService>(AssignorsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new assignor and return it with a 201 status code and an ID', async () => {
      const response = {
        id: uuid(),
        ...mockCreateAssignorDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(response);
      expect(controller.create(mockCreateAssignorDto));
      expect(service.create).toHaveBeenCalledWith(mockCreateAssignorDto);
      expect(controller.create(mockCreateAssignorDto)).resolves.toEqual(
        response,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of assignors', async () => {
      const allAssignors = await controller.findAll();

      jest.spyOn(controller, 'findAll').mockResolvedValue(mockAssignorList);

      expect(allAssignors).toEqual(mockAssignorList);
    });
  });

  describe('findOne', () => {
    it('should return an assignor by id', async () => {
      const id = mockAssignorList[0].id;
      const assignor = mockAssignorList[0];

      const findOneAssignor = await controller.findOne(id);
      jest.spyOn(controller, 'findOne').mockResolvedValue(assignor);

      expect(findOneAssignor).toEqual(assignor);
    });
  });

  describe('update', () => {
    it('should update an assignor by id', async () => {
      const id = mockAssignorList[0].id;

      const updatedAssignor = await controller.update(
        id,
        mockUpdateAssignorDto,
      );

      jest
        .spyOn(controller, 'update')
        .mockResolvedValue({ id, ...mockUpdateAssignorDto } as Assignor);

      expect(updatedAssignor).toEqual({ id, ...mockUpdateAssignorDto });
    });
  });

  describe('remove', () => {
    it('should remove an assignor by id', async () => {
      const id = mockAssignorList[0].id;
      const assignor = mockAssignorList[0];

      const removedAssignor = await controller.remove(id);
      jest.spyOn(controller, 'remove').mockResolvedValue(assignor);

      expect(removedAssignor).toEqual(assignor);
    });
  });
});
