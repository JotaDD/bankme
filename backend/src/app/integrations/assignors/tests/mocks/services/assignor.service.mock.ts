import { UUID } from "crypto";
import { v4 as uuid } from 'uuid';
import { mockAssignorList, removeResponseSuccess } from "..";
import { AssignorsService } from "../../../assignors.service";
import { CreateAssignorDto } from "../../../dto/create-assignor.dto";
import { UpdateAssignorDto } from "../../../dto/update-assignor.dto";

export const mockAssignorsService = {
  provide: AssignorsService,
  useValue: {
    create: jest.fn((dto: CreateAssignorDto) => {
      return { id: uuid(), ...dto }
    }),
    findAll: jest.fn(() => mockAssignorList),
    findOne: jest
      .fn((id: UUID) => mockAssignorList.find((assignor) => assignor.id === id)),
    update: jest
      .fn((id: UUID, dto: UpdateAssignorDto) => ({ id, ...dto })),
    remove: jest
      .fn(() => removeResponseSuccess),
  },
};

