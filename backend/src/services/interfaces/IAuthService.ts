import { UserDTO } from '../../dto/user.dto';

export default interface IAuthService {
  register(name:string, email: string, password: string): Promise<{user:UserDTO,token:string}>;
  login(email: string, password: string): Promise<{ user: UserDTO, token: string }>;
}
