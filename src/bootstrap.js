import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(compose((window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)));

import './style/main.scss';
import history from './history';

import MainPage from './components/mainPage';
import App from './components/app';
import LifeUpdates from './components/lifeUpdates';
import Media from './components/media';
import NavBar from './components/header/nav-bar';
import Blog from './components/blog';

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={history} >
        <App>
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/lifeUpdates' exact component={LifeUpdates} />
            <Route path='/media' exact component={Media} />
            <Route path='/blog' exact component={Blog} />
          </Switch>
        </App>
      </Router>
    </Provider>
    , document.querySelector('.app-wrapper'));
}

document.addEventListener('DOMContentLoaded', main);
