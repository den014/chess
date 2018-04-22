import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Board from './components/Board/Board';

import './index.scss';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Board/>
	</Provider>,
	document.getElementById('app')
);

module.hot.accept();