import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
 
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './store/reducers'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
//  import "typeface-roboto";
import{ BrowserRouter} from 'react-router-dom'
import { initializeIcons } from '@uifabric/icons';
import logger from 'redux-logger';
initializeIcons();

let middleware : any = null
if(process.env.NODE_ENV !== 'production'){
	middleware = applyMiddleware(thunk, logger);
}else{
	middleware = applyMiddleware(thunk);
}

const store = createStore(reducer,middleware);
// require('es6-promise').polyfill();

ReactDOM.render(
<BrowserRouter>
	<Provider store={store}>
  		<App />
  	</Provider>
  	</BrowserRouter>
  ,document.getElementById('root') as HTMLElement
);