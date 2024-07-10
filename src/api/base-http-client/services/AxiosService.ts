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

  /**
   *  GET request
   * @param url String that represent the url expect to sent to
   * @returns Promise with object of R structure 
   */
  async get<R>(url: string): Promise<R> {
    const response: AxiosResponse<R> = await this.axiosInstance.get(url);
    return response.data as R;
  }

  /**
   * POST request
   * @param url String that represent the url expect to sent to
   * @param body Payload that represent the request body 
   * @returns Promise with object of R structure 
   */
  async post<R>(url: string, body: T): Promise<R> {
    const response: AxiosResponse<R> = await this.axiosInstance.post(url, body);
    return response.data as R;
  }
}