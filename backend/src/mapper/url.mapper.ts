import { UrlDTO } from '../dto/url.dto';
import { IUrl } from '../models/urlModel';

export class UrlMapper {
  static toUrlDTO(url: IUrl): UrlDTO {
    return {
      id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    };
  }
}
