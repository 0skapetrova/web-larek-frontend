import { IProduct } from './types/index';
import { appApi } from './base/AppApi';
import { EventEmitter } from './base/EventEmitter';
import { Page } from './components/Page';
import { Product } from './components/Product';
import { CartData } from './model/CartData';
import { ClientData } from './model/ClientData';
import { ProductsData } from './model/ProductsData';
import './scss/styles.scss';
import { testClient, testOrder, testOrderData, testProduct, testProducts } from './utils/tempConstants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Sucsess';

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

const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const cart = new Cart(cloneTemplate(cartTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(sucsessTemplate));

events.on('product:select', (item) => {
    console.log(item);        
    // modal.render({
    //     content: 
    // })
});

events.on('product:select', (data) => {
    console.log(data);
    
	// const { product } = data;
	const preview = productsData.getProduct(testProduct.id);
    const element = new Product(cloneTemplate(productPreviewTemplate), events).render(preview);
	modal.render({content: element});
});

(async () => {
    const data = await appApi.getProducts();
    productsData.products = data;
    const productsArray = productsData.products.map(product => new Product(cloneTemplate(productCatalogTemplate), events, {
        onClick: () => events.emit('product:select', { card: this })
    }).render(product));
    page.render({catalog: productsArray, counter: cartData.getCount()})
})();











 
