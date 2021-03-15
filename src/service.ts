import REST from './api/rest';
import client from './api/client';
import LoadingMiddleware from './serviceMiddlewares/loadingMiddleware';
import store from './store';
import config from '../config';
import LoginReply from './types/login';
import {NewsReply, NewsByIdReply} from './types/news';
import {Moment} from 'moment';
import {CalendarReply} from './types/calendar';
import Account from './types/account';
import Billing from './types/billing';
import Season from './types/season';
import Presence from './types/presence';
import CreateEvent from './types/createEvent';
import Category from './types/category';

export interface Service {
    login(
        email: string,
        password: string,
        loading: boolean,
    ): Promise<LoginReply>;
    forgot(email: string): Promise<any>;
    signUp(email: string): Promise<any>;
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
    getUserProfile(token: string, organisationId: number): Promise<Account>;
    changePassword(
        token: string,
        organisationId: number,
        newPassword: string,
    ): Promise<boolean>;
    getBilling(
        token: string,
        organisationId: number,
        seassonId: number,
    ): Promise<Billing[]>;
    getSeasons(token: string, organisationId: number): Promise<Season[]>;
    getPresence(
        token: string,
        organisationId: number,
        seassonId: number,
    ): Promise<Presence>;
    createEvent(
        cEvent: CreateEvent,
        organisationId: number,
        token: string,
    ): Promise<void>;
    getCategories(token: string, organisationId: number): Promise<Category[]>;
    sendPush(
        token: string,
        organisationId: number,
        topic: string,
        title: string,
        body: string,
    ): Promise<void>;
}

const rest: Service = new REST(client, config.BACKEND);
const loadingMiddleware: Service = new LoadingMiddleware(rest, store.dispatch);

export default loadingMiddleware;
