import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, settings } from './utils/constants';

const events = new EventEmitter();

const api = new Api (API_URL, settings);

const products = api.get('/product/').then(res => {
    return res;
} 
)

console.log(products)