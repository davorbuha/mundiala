import {Service} from '../service';
import {Dispatch, AnyAction} from 'redux';
import {startLoading, stopLoading} from '../loadingReducer/actions';
import LoginReply from '../types/login';
import {NewsReply, NewsByIdReply} from '../types/news';
import {Moment} from 'moment';
import {CalendarReply} from '../types/calendar';
import Account from '../types/account';
import Billing from '../types/billing';
import Season from '../types/season';
import Presence from '../types/presence';
import CreateEvent from '../types/createEvent';
import Category from '../types/category';

class LoadingMiddleware implements Service {
    private dispatch: Dispatch<AnyAction>;
    private next: Service;

    constructor(next: Service, dispatch: Dispatch<AnyAction>) {
        this.dispatch = dispatch;
        this.next = next;
    }
    public async login(
        email: string,
        password: string,
        loading: boolean,
    ): Promise<LoginReply> {
        let res;
        try {
            loading && this.dispatch(startLoading(this.login.name));
            res = await this.next.login(email, password, loading);
            loading && this.dispatch(stopLoading(this.login.name));
        } catch (e) {
            loading && this.dispatch(stopLoading(this.login.name));
            throw e;
        }
        return res;
    }

    public async signUp(email: string): Promise<any> {
        return await this.next.signUp(email);
    }

    public async checkToken(token: string, loading: boolean): Promise<boolean> {
        let res;
        try {
            loading && this.dispatch(startLoading(this.checkToken.name));
            res = await this.next.checkToken(token, loading);
            loading && this.dispatch(stopLoading(this.checkToken.name));
            return res;
        } catch (e) {
            loading && this.dispatch(stopLoading(this.checkToken.name));
            throw e;
        }
    }

    public async getPresence(
        token: string,
        organisationId: number,
        seassonId: number,
    ): Promise<Presence> {
        let res;
        try {
            this.dispatch(startLoading(this.getPresence.name));
            res = await this.next.getPresence(token, organisationId, seassonId);
            this.dispatch(stopLoading(this.getPresence.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getPresence.name));
            throw e;
        }
    }

    public async getNews(
        organisationId: number,
        token: string,
        page: number,
        pageSize: number,
    ): Promise<NewsReply> {
        try {
            this.dispatch(startLoading(this.getNews.name));
            const res = await this.next.getNews(
                organisationId,
                token,
                page,
                pageSize,
            );
            this.dispatch(stopLoading(this.getNews.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getNews.name));
            throw e;
        }
    }

    public async getNewsById(
        token: string,
        id: string,
        organisationId: number,
    ): Promise<NewsByIdReply> {
        try {
            this.dispatch(startLoading(this.getNewsById.name));
            const res = await this.next.getNewsById(token, id, organisationId);
            this.dispatch(stopLoading(this.getNewsById.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getNewsById.name));
            throw e;
        }
    }

    public async getCalendar(
        token: string,
        organisationId: number,
        from: Moment,
        till: Moment,
    ): Promise<CalendarReply> {
        try {
            this.dispatch(startLoading(this.getCalendar.name));
            const res = await this.next.getCalendar(
                token,
                organisationId,
                from,
                till,
            );
            this.dispatch(stopLoading(this.getCalendar.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getCalendar.name));
            throw e;
        }
    }

    public async getUserProfile(
        token: string,
        organisationId: number,
    ): Promise<Account> {
        try {
            this.dispatch(startLoading(this.getUserProfile.name));
            const res = await this.next.getUserProfile(token, organisationId);
            this.dispatch(stopLoading(this.getUserProfile.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getUserProfile.name));
            throw e;
        }
    }

    public async changePassword(
        token: string,
        organisationId: number,
        newPassword: string,
    ): Promise<boolean> {
        try {
            this.dispatch(startLoading(this.changePassword.name));
            const res = await this.next.changePassword(
                token,
                organisationId,
                newPassword,
            );
            this.dispatch(stopLoading(this.changePassword.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.changePassword.name));
            throw e;
        }
    }
    public async getBilling(
        token: string,
        organisationId: number,
        seasonId: number,
    ): Promise<Billing[]> {
        try {
            this.dispatch(startLoading(this.getBilling.name));
            const res = await this.next.getBilling(
                token,
                organisationId,
                seasonId,
            );
            this.dispatch(stopLoading(this.getBilling.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getBilling.name));
            throw e;
        }
    }
    public async getSeasons(
        token: string,
        organisationId: number,
    ): Promise<Season[]> {
        try {
            this.dispatch(startLoading(this.getSeasons.name));
            const res = await this.next.getSeasons(token, organisationId);
            this.dispatch(stopLoading(this.getSeasons.name));
            return res;
        } catch (e) {
            this.dispatch(stopLoading(this.getSeasons.name));
            throw e;
        }
    }

    public async createEvent(
        cEvent: CreateEvent,
        organisationId: number,
        token: string,
    ): Promise<void> {
        return this.next.createEvent(cEvent, organisationId, token);
    }

    public async getCategories(
        token: string,
        organisationId: number,
    ): Promise<Category[]> {
        return this.next.getCategories(token, organisationId);
    }

    public async sendPush(
        token: string,
        organisationId: number,
        topic: string,
        title: string,
        body: string,
    ): Promise<void> {
        return this.next.sendPush(token, organisationId, topic, title, body)
    }
}

export default LoadingMiddleware;
