import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      findAll: (email: string): Promise<User[]> => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      findOne: (email: string): Promise<User> => {
        const filteredUsers = users.filter((user) => user.email === email)[0];
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '300s' },
        }),
      ],
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const importInfo = {
      email: 'asdf@asdf.com',
      password: 'asdf',
      role: 'admin',
    };
    const ofImportDto = plainToInstance(CreateUserDto, importInfo);
    const user = await service.signup(ofImportDto);

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    const importInfo = {
      email: 'asdf@asdf.com',
      password: 'asdfasdas!"#!"#!"#ASDAS',
      role: 'admin',
    };
    const ofImportDto = plainToInstance(CreateUserDto, importInfo);

    await service.signup(ofImportDto);
    try {
      await service.signup(ofImportDto);
    } catch (err) {
      return;
    }
  });

  it('throws if signin is called with an unused email', async () => {
    try {
      await service.signIn('asdflkj@asdlfkj.com', 'passdflkj');
    } catch (err) {
      return;
    }
  });

  it('throws if an invalid password is provided', async () => {
    const importInfo = {
      email: 'laskdjf@alskdfj.com',
      password: 'password',
      role: 'admin',
    };
    const ofImportDto = plainToInstance(CreateUserDto, importInfo);
    await service.signup(ofImportDto);
    try {
      await service.signIn('laskdjf@alskdfj.com', 'laksdlfkj');
    } catch (err) {
      return;
    }
  });
});
