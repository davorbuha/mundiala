import React from 'react';
import Router from './src/router';
import {Provider} from 'react-redux';
import store from './src/store';
import Background from './src/components/Background';
import Loading from './src/components/Loading';

function App() {
    return (
        <Provider store={store}>
            <Background>
                <Router />
            </Background>
        </Provider>
    );
}

export default App;
