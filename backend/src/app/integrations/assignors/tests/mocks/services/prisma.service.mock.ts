import { PrismaService } from "../../../../../../database/prisma/prisma.service";

export const mockPrismaService = {
  assignor: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
