import { IUrl } from '../../models/urlModel';

export default interface IUrlRepository {
  create(url: Partial<IUrl>): Promise<IUrl>;
  findByShortId(shortId: string): Promise<IUrl | null>;
  findByUser(userId: string, page?: number, limit?: number): Promise<{ items: IUrl[], total: number }>;
  incrementVisits(shortId: string): Promise<void>;
}
