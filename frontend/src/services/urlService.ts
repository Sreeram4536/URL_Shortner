import axiosInstance from "../axios/axiosInstance";

export const urlService = {
    async shortenUrl(originalUrl:string){
        const response = await axiosInstance.post('/url/shorten',{originalUrl})
        return response.data;
    },
    async getUserUrls(page = 1, limit = 10) {
        const response = await axiosInstance.get('/url/my-urls', {
            params: { page, limit }
        });
        return response.data;
    },
}