import { UrlDTO } from '../../dto/url.dto';

export default interface IUrlService {
  shortenUrl(originalUrl: string, userId: string): Promise<UrlDTO>;
  getUserUrls(userId: string): Promise<UrlDTO[]>;
  getOriginalUrl(shortId: string): Promise<string | null>;
}
