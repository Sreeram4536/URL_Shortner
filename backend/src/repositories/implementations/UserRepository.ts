import IUserRepository from '../interfaces/IUserRepository';
import UserModel, { IUser } from '../../models/userModel';
import BaseRepository from '../BaseRepository';

export default class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
  // The inherited create, findById, etc. work as before.
}
