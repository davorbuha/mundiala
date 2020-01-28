import REST from './api/rest';
import client from './api/client';
import LoadingMiddleware from './serviceMiddlewares/loadingMiddleware';
import store from './store';
import config from '../config';
import LoginReply from './types/login';
import {NewsReply, NewsByIdReply} from './types/news';
import {Moment} from 'moment';
import {CalendarReply} from './types/calendar';

export interface Service {
    login(
        email: string,
        password: string,
        loading: boolean,
    ): Promise<LoginReply>;
    checkToken(token: string, loading: boolean): Promise<boolean>;
    getNews(
        organisationId: number,
        token: string,
        page: number,
        pageSize: number,
    ): Promise<NewsReply>;
    getNewsById(
        token: string,
        id: string,
        organisationId: number,
    ): Promise<NewsByIdReply>;
    getCalendar(
        token: string,
        organisationId: number,
        from: Moment,
        till: Moment,
    ): Promise<CalendarReply>;
}

const rest = new REST(client, config.BACKEND);
const loadingMiddleware = new LoadingMiddleware(rest, store.dispatch);

export default loadingMiddleware;
