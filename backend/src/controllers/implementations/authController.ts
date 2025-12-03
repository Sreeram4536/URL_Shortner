import { Request, Response } from 'express';
import IAuthController from '../interfaces/IAuthController';
import IAuthService from '../../services/interfaces/IAuthService';
import { signinSchema, signupSchema } from '../../validators/authValidator';

export class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }


async register(req: Request, res: Response): Promise<void> {
    // Validate request body
    const parsed = signupSchema.safeParse(req.body);

    if (!parsed.success) {
      // Zod errors are in parsed.error.issues
       res.status(400).json({ errors: parsed.error.issues });
       return;
    }

    const { name, email, password } = parsed.data;

    try {
      const { user, token } = await this.authService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Registration failed' });
    }
  }



 async login(req: Request, res: Response): Promise<void> {
    // Validate request body
    const parsed = signinSchema.safeParse(req.body);

    if (!parsed.success) {
       res.status(400).json({ errors: parsed.error.issues });
       return;
    }

    const { email, password } = parsed.data;

    try {
      const { user, token } = await this.authService.login(email, password);
      res.status(200).json({ message: 'Login successful', user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message || 'Login failed' });
    }
  }
}
