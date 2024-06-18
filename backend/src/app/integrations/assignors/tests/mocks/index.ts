import { UUID } from 'crypto';
import { AssignorsService } from '../../assignors.service';
import { CreateAssignorDto } from '../../dto/create-assignor.dto';
import { UpdateAssignorDto } from '../../dto/update-assignor.dto';
import { AssignorEntity } from '../../entities/assignor.entity';
import { v4 as uuid } from 'uuid';

export const mockAssignorList: AssignorEntity[] = [
  {
    id: uuid() as UUID,
    document: '12345678902',
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

export const removeResponseSuccess = {
  statusCode: 200,
  message: 'Cedente removido com sucesso!',
};

export const mockCreateAssignorDto: CreateAssignorDto = {
  document: '123.456.789-02',
  email: 'johnny@test.com',
  phone: '(11)99999-8888',
  name: 'Johnny Test',
};

export const mockUpdateAssignorDto: UpdateAssignorDto = {
  document: '1231231233',
  email: 'update@test.com',
  phone: '11999998889',
  name: 'Update Test',
};
