import axiosInstance from "../axios/axiosInstance";

export const urlService = {
    async shortenUrlAPI(originalUrl:string){
        const response = await axiosInstance.post('/url/shorten',{originalUrl})
        return response.data;
    },
    async getUserUrls() {
    const response = await axiosInstance.get('/url/user');
    return response.data;
  },
}