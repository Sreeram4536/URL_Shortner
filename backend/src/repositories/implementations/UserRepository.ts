import IUserRepository from '../interfaces/IUserRepository';
import UserModel, { IUser } from '../../models/userModel';

export default class UserRepository implements IUserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }
}
