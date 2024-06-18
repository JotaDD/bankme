import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          }
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateUser', () => {
    it('FAILURE - should throw UnauthorizedException if user password is incorrect', async () => {
      const mockUser = {
        id: uuid(),
        login: 'user',
        password: 'password',
      };

      const userServiceSpy = jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);
      const response = service.validateUser(mockUser.login, 'wrongpassword');

      expect(response).rejects.toThrow(UnauthorizedException);
      expect(response).rejects.toThrow('Não autorizado');
      expect(userServiceSpy).toHaveBeenCalledWith(mockUser.login);

    });

    it('SUCCESS - should return the user if password is correct', async () => {
      const mockUser = {
        id: uuid(),
        login: 'user',
        password: 'password',
      };
      const findOneSpy = jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);

      const user = await service.validateUser(mockUser.login, mockUser.password);

      expect(user).toEqual(mockUser);
      expect(findOneSpy).toHaveBeenCalledWith(mockUser.login);
    });



  });

  describe('signIn', () => {
    it('should return a token', async () => {
      // Arrange
      const mockUser = {
        id: uuid(),
        login: 'mockUserLogin',
        password: 'password'
      };

      const token = 'token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(token);
      const result = await service.signIn(mockUser);

      expect(result).toEqual({ token: token });
      expect(jwtService.sign).toHaveBeenCalledWith({ login: mockUser.login, sub: mockUser.id });
    });
  });

});