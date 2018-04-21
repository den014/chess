import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '$reducers';

const logger = createLogger({
	level: 'info',
	collapsed: true
});

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middleware = applyMiddleware(thunk, logger);

export default function configureStore(initialState) {
	return middleware(devTools(createStore))(rootReducer, initialState);
}
