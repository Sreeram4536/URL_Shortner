import axiosInstance from "../axios/axiosInstance"

export const authService = {
  async login(email: string, password: string) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name: string, email: string, password: string,confirmPassword:string) {
    const response = await axiosInstance.post('/auth/register', { name, email, password,confirmPassword });
    return response.data;
  },
};
