import {createStore, combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import backgroundReducer from './backgroundReducer';
import userReducer from './userReducer';
import {State as BackgroundState} from './backgroundReducer';
import {State as LoadingState} from './loadingReducer';
import {State as UserState} from './userReducer';

const composeEnhancers = composeWithDevTools({});

const combined = combineReducers({
    background: backgroundReducer,
    loading: loadingReducer,
    user: userReducer,
});

const store = createStore(combined, composeEnhancers());

export interface AppState {
    background: BackgroundState;
    loading: LoadingState;
    user: UserState;
}

export default store;
