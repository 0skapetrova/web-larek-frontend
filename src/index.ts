import { appApi } from './base/AppApi';
import { EventEmitter } from './base/EventEmitter';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { ProductCatalog } from './components/ProductCatalog';
import { CartData } from './model/CartData';
import { ClientData } from './model/ClientData';
import { ProductsData } from './model/ProductsData';
import './scss/styles.scss';
import { testClient, testOrder, testOrderData, testProduct, testProducts } from './utils/tempConstants';
import { ensureElement } from './utils/utils';

const events = new EventEmitter();
const productsData = new ProductsData(events);
const cartData = new CartData(events);
const clientData = new ClientData(events);

const productCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const sucsessTemplate = ensureElement<HTMLTemplateElement>('#success');

// const page = new Page(document.body, events);
// const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


// (async () => {
//     const data = await appApi.getProducts();
//     productsData.products = data;
// })();

const testContainer = document.querySelector('.gallery');





 
