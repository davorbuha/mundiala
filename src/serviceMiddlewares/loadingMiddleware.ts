import {Service} from '../service';
import {Dispatch, AnyAction} from 'redux';
import {startLoading, stopLoading} from '../loadingReducer/actions';

class LoadingMiddleware implements Service {
    private dispatch: Dispatch<AnyAction>;
    private next: Service;

    constructor(next: Service, dispatch: Dispatch<AnyAction>) {
        this.dispatch = dispatch;
        this.next = next;
    }
    public async login(email: string, password: string, loading: boolean) {
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
}

export default LoadingMiddleware;
