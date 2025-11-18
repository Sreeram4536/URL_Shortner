import { Request, Response } from 'express';
import IUrlService from '../../services/interfaces/IUrlService';
import IUrlController from '../interfaces/IUrlController';


export class UrlController implements IUrlController {
  constructor(private urlService: IUrlService) {}

  async shortenUrl(req: Request, res: Response): Promise<void> {
    try {
      const { originalUrl } = req.body;
      const userId = (req as any).user?.id; // from JWT middleware

      const data = await this.urlService.shortenUrl(originalUrl, userId);
      res.status(201).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUserUrls(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await this.urlService.getUserUrls(userId, page, limit);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async redirect(req: Request, res: Response): Promise<void> {
    try {
      const { shortId } = req.params;
      const originalUrl = await this.urlService.getOriginalUrl(shortId);

      if (!originalUrl) {
        res.status(404).send('URL not found');
        return;
      }

      res.redirect(originalUrl);
    } catch (error: any) {
      res.status(500).send('Server error');
    }
  }
}
