import { Request, Response } from 'express';

export default interface IUrlController {
  shortenUrl(req: Request, res: Response): Promise<void>;
  getUserUrls(req: Request, res: Response): Promise<void>;
  redirect(req: Request, res: Response): Promise<void>;
}
