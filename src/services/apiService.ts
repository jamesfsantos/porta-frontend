import type { Resultado } from '@/models/types/resultado.type';
import axios, { AxiosError, type AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5288/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function post<T>(endpoint:string, data:T) : Promise<Resultado<T | null>>
{

   try {
    const response = await apiClient.post(endpoint,data);
    return {
      data: response.data,
      sucesso:true
    } as Resultado<T>
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const errorResponse = error as AxiosError<Resultado>;
      const { response } = errorResponse;
      if (response?.data)
        return response.data;
    }

    return { erros: ["Erro na requisição"] } as Resultado;
  }
}

async function get<T>(endpoint: string): Promise<Resultado<T | null>> {
  try {
    const response = await apiClient.get<T>(endpoint);
    return {
      data: response.data,
      sucesso:true
    } as Resultado<T>
  } catch (error) {

    if (axios.isAxiosError(error)) {
      const errorResponse = error as AxiosError<Resultado>;
      const { response } = errorResponse;
      if (response?.data)
        return response.data;
    }

    return { erros: ["Erro na requisição"] } as Resultado;
  }
}

// Add a request interceptor
// apiClient.interceptors.request.use((config) => {
//   // e.g., add auth token
//   const token = localStorage.getItem('user-token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default  {
  get,
  post
}
