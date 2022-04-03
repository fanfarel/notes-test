import React, { FC } from 'react';
import AppEntry from './components/AppEntry';
import { Provider } from 'react-redux';
import { store } from './store';

const App : FC = () => {
    return (
        <Provider store={store}>
            <AppEntry/>
        </Provider>
    );
}

export default App;
