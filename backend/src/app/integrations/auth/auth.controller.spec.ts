import { UUID } from 'crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { v4 as uuid } from 'uuid';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService, useValue: {
          signIn: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should call authService.signIn and return the result', async () => {

      const mockUser = {
        id: uuid(),
        login: 'mockUserLogin',
        password: 'password',
      };

      const mockRequest = {
        user: mockUser,
      };
      const token = 'token';

      jest.spyOn(authService, 'signIn').mockResolvedValue({ token });

      const response = await controller.signIn(mockRequest.user as any);

      expect(response).toEqual({ token: token });
    });
  });
});