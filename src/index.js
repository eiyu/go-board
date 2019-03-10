
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import LandingPage from './components/LandingPage'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {allReducer} from './reducers'
const store = createStore(allReducer)
ReactDOM.render(<Provider store={store}><LandingPage /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
