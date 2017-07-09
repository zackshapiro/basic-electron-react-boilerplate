require('../styles/main.scss');
require('../styles/menubar.scss');
require('../styles/panel.scss');
require('../styles/sky.scss');
require('../styles/dock.scss');
require('../styles/sector.scss');
require('../styles/slot.scss');
require('../styles/element_builder.scss');
require('../styles/slot-view.scss');
require('../styles/signin.scss');

'use strict';

import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './entities/reducers';
import sagas from './entities/sagas';

import App from './components/App'; // rename Application

const sagaMiddleware = createSagaMiddleware();

const composedCreateStore = compose(applyMiddleware(sagaMiddleware))(createStore);

const store = composedCreateStore(reducer, {});
sagaMiddleware.run(sagas);

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
// let root = document.createElement('div');
// root.id = "root";
// document.body.appendChild( root );

// Now we can render our application into it
// render( 
//     <App />, document.getElementById('root') 
// );

render((<Provider store = {store}>
        <App />
    </Provider>
), document.getElementById('content'));
