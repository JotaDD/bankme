import { UUID } from 'crypto';
import { AssignorsService } from '../../assignors.service';
import { CreateAssignorDto } from '../../dto/create-assignor.dto';
import { UpdateAssignorDto } from '../../dto/update-assignor.dto';
import { AssignorEntity } from '../../entities/assignor.entity';
import { v4 as uuid } from 'uuid';

export const mockAssignorList: AssignorEntity[] = [
  {
    id: uuid() as UUID,
    document: '12345678901',
    email: 'johnny@tes.com',
    phone: '11999998888',
    name: 'Johnny Test',
  },
  {
    id: uuid() as UUID,
    document: '12345678902',
    email: 'mary@test.com',
    phone: '11999998889',
    name: 'Mary Test',
  },
  {
    id: uuid() as UUID,
    document: '12345678903',
    email: 'susan@test.com',
    phone: '11999998890',
    name: 'Susan Test',
  },
];

export const mockAssignorsService = {
  provide: AssignorsService,
  useValue: {
    create: jest.fn().mockImplementation((dto: CreateAssignorDto) => ({
      id: uuid(),
      ...dto,
    })),
    findAll: jest.fn().mockResolvedValue(mockAssignorList),
    findOne: jest
      .fn()
      .mockImplementation((id: UUID) =>
        Promise.resolve(
          mockAssignorList.find((assignor) => assignor.id === id),
        ),
      ),
    update: jest
      .fn()
      .mockImplementation((id: UUID, dto: UpdateAssignorDto) =>
        Promise.resolve({ id, ...dto }),
      ),
    remove: jest
      .fn()
      .mockImplementation((id: UUID) =>
        Promise.resolve(
          mockAssignorList.find((assignor) => assignor.id === id),
        ),
      ),
  },
};

export const mockCreateAssignorDto: CreateAssignorDto = {
  document: '12345678901',
  email: 'johnny@test.com',
  phone: '11999998888',
  name: 'Johnny Test',
};

export const mockUpdateAssignorDto: UpdateAssignorDto = {
  document: '12345678902',
  email: 'update@test.com',
  phone: '11999998889',
  name: 'Update Test',
};
