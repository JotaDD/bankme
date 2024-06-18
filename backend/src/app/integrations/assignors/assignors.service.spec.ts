import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { AssignorsService } from './assignors.service';

import { AssignorAlreadyExistsException, AssignorNotFoundException } from './exceptions';
import { mockAssignorList, mockCreateAssignorDto, mockUpdateAssignorDto } from './tests/mocks';
import { mockPrismaService } from './tests/mocks/services/prisma.service.mock';

describe('AssignorsService', () => {
  let service: AssignorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AssignorsService>(AssignorsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('/POST - CREATE', () => {
    it('SUCCESS - should create a new assignor', async () => {
      const newAssignor = {
        id: uuid(),
        ...mockCreateAssignorDto
      }

      jest.spyOn(prismaService.assignor, 'create').mockResolvedValue(newAssignor);

      expect(service.create(mockCreateAssignorDto)).resolves.toEqual(newAssignor);
    });

    it('FAILURE - ALREADY EXISTS - should throw an error if assignor already exists', async () => {
      jest.spyOn(prismaService.assignor, 'create').mockRejectedValue(new AssignorAlreadyExistsException());

      expect(service.create(mockCreateAssignorDto)).rejects.toThrow('Cedente já cadastrado');
      expect(service.create(mockCreateAssignorDto)).rejects.toThrow(AssignorAlreadyExistsException);
    });
  });

  describe('/GET - ALL ASSIGNORS', () => {
    it('SUCCESS - should return a list of all assignors', async () => {

      jest.spyOn(prismaService.assignor, 'findMany').mockResolvedValue(mockAssignorList);

      const allAssignors = await service.findAll();

      expect(allAssignors).toEqual(mockAssignorList);
    });
  })

  describe('/GET - GET BY ID', () => {
    it('SUCCESS - should return one assignor', async () => {
      const id = mockAssignorList[0].id;
      const assignor = mockAssignorList[0]

      jest.spyOn(prismaService.assignor, 'findUnique').mockResolvedValue(assignor)
      expect(await service.findOne(id)).toEqual(assignor)
    })

    it('FAILURE - should return one assignor', async () => {
      const id = '1';

      jest.spyOn(prismaService.assignor, 'findUnique').mockResolvedValue(null)
      expect(service.findOne(id)).rejects.toThrow(AssignorNotFoundException)
    })
  })

  describe('/PATCH - UPDATE', () => {
    it('SUCCESS - should return the updated assignor with the new info', async () => {
      const id = mockAssignorList[0].id;

      jest.spyOn(service, 'validateIfAssignorIsFound').mockResolvedValue(true);
      jest.spyOn(prismaService.assignor, 'update').mockResolvedValue(mockAssignorList[0]);


      expect(await service.update(id, mockUpdateAssignorDto)).toEqual(mockAssignorList[0]);

    });

    it('FAILURE - should throw an error if assignor is not found', async () => {
      const id = '1';

      jest.spyOn(prismaService.assignor, 'update').mockRejectedValue(new AssignorNotFoundException());

      expect(service.update(id, mockCreateAssignorDto)).rejects.toThrow('Cedente não encontrado');
      expect(service.update(id, mockCreateAssignorDto)).rejects.toThrow(AssignorNotFoundException);
    });

    it('FAILURE - should throw an error if assignor already exists', async () => {
      const id = '0f732e1a-e3fd - 4da8 - 8087 - 40a83bef4f9e'
      const mockUpdate = {
        document: '12345678902',
        ...mockUpdateAssignorDto
      }


      jest.spyOn(service, 'validateIfAssignorIsFound').mockResolvedValue(true);
      jest.spyOn(prismaService.assignor, 'update').mockRejectedValue(new AssignorAlreadyExistsException());

      expect(service.update(id, mockUpdate)).rejects.toThrow('Cedente já cadastrado!');
      expect(service.update(id, mockUpdate)).rejects.toThrow(AssignorAlreadyExistsException);
    });
  })

  describe('/DELETE - DELETE', () => {
    it('SUCCESS - should return a success message if assignor is deleted', async () => {
      const id = mockAssignorList[0].id;

      jest.spyOn(prismaService.assignor, 'delete');

      expect(await service.remove(id)).toEqual({ statusCode: 200, message: 'Cedente removido com sucesso!' });
    })
    it('FAILURE - should throw an error if assignor is not found', async () => {
      const id = '1';

      jest.spyOn(prismaService.assignor, 'delete').mockRejectedValue(new AssignorNotFoundException());

      expect(service.remove(id)).rejects.toThrow('Cedente não encontrado!');
      expect(service.remove(id)).rejects.toThrow(AssignorNotFoundException);
    })
  })
});
