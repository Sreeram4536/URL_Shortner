import { Request, Response } from 'express';
import IAuthController from '../interfaces/IAuthController';
import IAuthService from '../../services/interfaces/IAuthService';

export class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      const user = await this.authService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Registration failed' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const { user, token } = await this.authService.login(email, password);
      res.status(200).json({ message: 'Login successful', user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message || 'Login failed' });
    }
  }
}
