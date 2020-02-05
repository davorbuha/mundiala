import {Service} from '../service';
import {AxiosRequestConfig, AxiosInstance} from 'axios';
import LoginReply from '../types/login';
import Loading from '../components/Loading';
import {NewsReply, NewsByIdReply} from '../types/news';
import {Moment} from 'moment';
import {CalendarReply} from '../types/calendar';
import Account from '../types/account';

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

    public async checkToken(token: string): Promise<boolean> {
        const data = {
            method: 'check-token',
            token,
        };
        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        if (res.data.ok === 1) {
            return true;
        }
        return false;
    }

    public async getNews(
        organisationId: number,
        token: string,
        page: number,
        pageSize: number,
    ): Promise<NewsReply> {
        const data = {
            method: 'news',
            token,
            organisation_id: organisationId,
            page,
            page_size: pageSize,
        };
        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        return NewsReply.fromJSON(res.data.data);
    }

    public async getNewsById(
        token: string,
        id: string,
        organisationId: number,
    ): Promise<NewsByIdReply> {
        const data = {
            method: 'news-article',
            organisation_id: organisationId,
            token,
            id,
        };
        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        return NewsByIdReply.fromJSON(res.data.data);
    }

    public async getCalendar(
        token: string,
        organisationId: number,
        from: Moment,
        till: Moment,
    ): Promise<CalendarReply> {
        const data = {
            method: 'schedule',
            token,
            organisation_id: organisationId,
            from: from.format('YYYY-MM-DD'),
            till: till.format('YYYY-MM-DD'),
        };

        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        return CalendarReply.fromJSON(res.data.data);
    }

    public async getUserProfile(
        token: string,
        organisationId: number,
    ): Promise<Account> {
        const data = {
            method: 'profile',
            token,
            organisation_id: organisationId,
        };

        const res = await this.request({method: 'POST', data});
        if (res.data.error !== '') {
            throw new Error(res.data.error);
        }
        return Account.fromJSON(res.data.data);
    }

    public async changePassword(
        token: string,
        organisationId: number,
        newPassword: string,
    ): Promise<boolean> {
        const data = {
            method: 'password-update',
            token,
            organisation_id: organisationId,
            new_password: newPassword,
        };

        const res = await this.request({method: 'POST', data});
        if (res.data.error) {
            throw new Error(res.data.error);
        }
        return true;
    }

    private async request(req: AxiosRequestConfig) {
        return await this.client.request({...req, url: this.url});
    }
}

export default REST;
