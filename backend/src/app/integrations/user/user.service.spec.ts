import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../../../database/prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService, useValue: {
            user: {
              findUniqueOrThrow: jest.fn()
            },
          }
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the user if found', async () => {

      const mockUser = { id: uuid(), login: 'user', password: 'password' };

      const findUniqueOrThrowSpy = jest.spyOn(prismaService.user, 'findUniqueOrThrow').mockResolvedValueOnce(mockUser);

      const user = await service.findOne('user');

      expect(user).toEqual(mockUser);
      expect(findUniqueOrThrowSpy).toHaveBeenCalledWith({ where: { login: 'user' } });
    });

    it('should return null if user is not found', async () => {
      const findUniqueOrThrowSpy = jest.spyOn(prismaService.user, 'findUniqueOrThrow').mockRejectedValue(new Error('User not found'));

      const user = await service.findOne('user');
      expect(user).toBeNull();
      expect(findUniqueOrThrowSpy).toHaveBeenCalledWith({ where: { login: 'user' } });
    });
  });
});