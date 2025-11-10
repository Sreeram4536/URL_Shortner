"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlMapper = void 0;
class UrlMapper {
    static toUrlDTO(url) {
        return {
            id: url._id.toString(),
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
        };
    }
}
exports.UrlMapper = UrlMapper;
