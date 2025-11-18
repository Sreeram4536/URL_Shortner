import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('AUTH MIDDLEWARE HEADER:', req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err: any) {
    console.error('JWT Middleware Error:', err);
    res.status(401).json({ message: err.message || 'Invalid token' });
  }
};
