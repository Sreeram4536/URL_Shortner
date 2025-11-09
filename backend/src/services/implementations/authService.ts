import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IAuthService from '../interfaces/IAuthService';
import IUserRepository from '../../repositories/interfaces/IUserRepository';
import { UserDTO } from '../../dto/user.dto';
import { UserMapper } from '../../mapper/user.mapper';

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(name: string, email: string, password: string): Promise<{user:UserDTO,token:string}> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({ name, email, password: hashed });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
    return {user:UserMapper.toUserDTO(newUser),token}; // ✅ map to DTO
  }

  async login(email: string, password: string): Promise<{ user: UserDTO; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return { user: UserMapper.toUserDTO(user), token }; // ✅ clean data returned
  }
}
