import {Service} from '../service';
import {Dispatch, AnyAction} from 'redux';
import {startLoading, stopLoading} from '../loadingReducer/actions';
import LoginReply from '../types/login';
import {NewsReply, NewsByIdReply} from '../types/news';
import {Moment} from 'moment';
import {CalendarReply} from '../types/calendar';
import Account from '../types/account';

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
}

export default LoadingMiddleware;
