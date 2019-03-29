
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './components/App'
import MyPage from './components/MyPage'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {allReducer} from './reducers'
const store = createStore(allReducer)
ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
