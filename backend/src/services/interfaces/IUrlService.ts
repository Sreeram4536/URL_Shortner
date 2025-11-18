import { UrlDTO } from '../../dto/url.dto';

export default interface IUrlService {
  shortenUrl(originalUrl: string, userId: string): Promise<UrlDTO>;
  getUserUrls(userId: string, page?: number, limit?: number): Promise<{ items: UrlDTO[], total: number }>;
  getOriginalUrl(shortId: string): Promise<string | null>;
}
