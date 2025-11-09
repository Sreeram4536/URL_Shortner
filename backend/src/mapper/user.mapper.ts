import { UserDTO } from '../dto/user.dto';
import { IUser } from '../models/userModel';


export class UserMapper {
  static toUserDTO(user: IUser): UserDTO {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
