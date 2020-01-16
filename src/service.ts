import REST from './api/rest';
import client from './api/client';
import LoadingMiddleware from './serviceMiddlewares/loadingMiddleware';
import store from './store';
import config from '../config';

export interface Service {
    login(email: string, password: string, loading: boolean): Promise<any>;
}

const rest = new REST(client, config.BACKEND);
const loadingMiddleware = new LoadingMiddleware(rest, store.dispatch);

export default loadingMiddleware;
