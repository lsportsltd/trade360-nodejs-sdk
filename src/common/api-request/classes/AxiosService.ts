import axios, { AxiosInstance, AxiosResponse } from 'axios';

/** Axios service instance for different API endpoints with varying request and response types.
 * class with a generic type T for the request body:
 * a generic type T which represents the type of the request body. 
 * and a response type R and return a promise of that response type R.
*/

export class AxiosService<T> {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get<R>(url: string): Promise<R> {
    const response: AxiosResponse<R> = await this.axiosInstance.get(url);
    return response.data;
  }

  async post<R>(url: string, body: T): Promise<R> {
    const response: AxiosResponse<R> = await this.axiosInstance.post(url, body);
    return response.data;
  }
}