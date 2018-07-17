import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from 'store/store';

import 'styles/main.less'

import App from 'components/App';

/* 初始化 */
renderWithHotReload(App);

if (module.hot) {
    module.hot.accept('components/App', () => {
        const NextApp = require('components/App').default;
        renderWithHotReload(NextApp);
    });
}

function renderWithHotReload(RootElement) {
    render(
    <AppContainer>
        <Provider store={store}>
            <Router>
                <RootElement />
            </Router>
        </Provider>
    </AppContainer>,
    document.querySelector('#app')
);
}