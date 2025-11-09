import { IUrl } from '../../models/urlModel';

export default interface IUrlRepository {
  create(url: Partial<IUrl>): Promise<IUrl>;
  findByShortId(shortId: string): Promise<IUrl | null>;
  findByUser(userId: string): Promise<IUrl[]>;
  incrementVisits(shortId: string): Promise<void>;
}
