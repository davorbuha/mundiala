import {Service} from '../service';
import {AxiosRequestConfig, AxiosInstance} from 'axios';
import LoginReply from '../types/login';

class REST implements Service {
    private client: AxiosInstance;
    private url: string;
    constructor(client: AxiosInstance, url: string) {
        this.client = client;
        this.url = url;
    }
    public async login(email: string, password: string) {
        const data = {
            method: 'login',
            email,
            password,
        };
        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        const loginReply = LoginReply.fromJSON(res.data);
        return loginReply;
    }

    private request(req: AxiosRequestConfig) {
        return this.client.request({...req, url: this.url});
    }
}

export default REST;
