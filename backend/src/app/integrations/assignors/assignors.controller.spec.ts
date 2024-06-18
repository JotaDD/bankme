import { Test, TestingModule } from '@nestjs/testing';
import { Assignor } from 'src/interfaces';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AssignorsController } from './assignors.controller';
import { AssignorsService } from './assignors.service';
import {
  mockAssignorList,
  mockCreateAssignorDto,
  mockUpdateAssignorDto,
} from './tests/mocks';
import { HttpStatus } from '@nestjs/common';
import { mockAssignorsService } from './tests/mocks/services/assignor.service.mock';

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

  describe('/POST - CREATE', () => {
    it('SUCCESS 201 - should create a new Assignor and return it', async () => {
      const response = {
        id: uuid(),
        ...mockCreateAssignorDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(response);

      expect(controller.create(mockCreateAssignorDto)).resolves.toEqual(
        response,
      );
    });
  });

  describe('/GET - FIND ALL', () => {
    it('SUCCESS 200 - should return a list of all Assignors ', async () => {
      const allAssignors = await controller.findAll();

      jest.spyOn(controller, 'findAll').mockResolvedValue(mockAssignorList);

      expect(allAssignors).toEqual(mockAssignorList);
    });
  });

  describe('/GET - FIND ONE', () => {
    it('SUCCESS 200 - should return one Assignor', async () => {
      const id = mockAssignorList[0].id;
      const assignor = mockAssignorList[0];

      const findOneAssignor = await controller.findOne(id);
      jest.spyOn(controller, 'findOne').mockResolvedValue(assignor);

      expect(findOneAssignor).toEqual(assignor);
    });
  });

  describe('/PATCH - UPDATE', () => {
    it('SUCCESS 200 - should return the updated Assignor with the new info', async () => {
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

  describe('/DELETE - REMOVE', () => {
    it('SUCCESS 200 - should return a status 200 and a message that it was successfully', async () => {
      const id = mockAssignorList[0].id;
      const response = {
        "statusCode": HttpStatus.OK,
        "message": "Cedente removido com sucesso!"
      }

      const removedAssignor = await controller.remove(id);
      jest.spyOn(controller, 'remove').mockResolvedValue(response);

      expect(removedAssignor).toEqual(response);
    });
  });
});
