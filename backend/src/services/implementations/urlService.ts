import shortid from 'shortid';
import IUrlService from '../interfaces/IUrlService';
import IUrlRepository from '../../repositories/interfaces/IUrlRepository';
import { UrlMapper } from '../../mapper/url.mapper';
import { UrlDTO } from '../../dto/url.dto';
import { Types } from 'mongoose';

export class UrlService implements IUrlService {
  constructor(private urlRepository: IUrlRepository) {}

  async shortenUrl(originalUrl: string, userId: string): Promise<UrlDTO> {
    const shortId = shortid.generate();
    const shortUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/s/${shortId}`;

    const url = await this.urlRepository.create({
      originalUrl,
      shortId,
      shortUrl,
      userId:new Types.ObjectId(userId),
    });

    return UrlMapper.toUrlDTO(url);
  }

  async getUserUrls(userId: string): Promise<UrlDTO[]> {
    const urls = await this.urlRepository.findByUser(userId);
    return urls.map(UrlMapper.toUrlDTO);
  }

   async getOriginalUrl(shortId: string): Promise<string | null> {
    const url = await this.urlRepository.findByShortId(shortId);
    if (!url) return null;

    await this.urlRepository.incrementVisits(shortId);
    return url.originalUrl;
  }
}
