import axios from 'axios'
import { AxiosResponse } from 'axios';

export interface AxiosError {
  response?: AxiosResponse;
  message: string;
}
const Customfetch = axios.create({
    baseURL: '/api',
   
})
export default Customfetch