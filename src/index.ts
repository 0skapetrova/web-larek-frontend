import './scss/styles.scss';
import { IProduct, TClientOrderData, TClientPersonalData } from './types/index';
import { appApi } from './base/AppApi';
import { EventEmitter } from './base/EventEmitter';
import { Page } from './components/Page';
import { CartData } from './model/CartData';
import { ClientData } from './model/ClientData';
import { ProductsData } from './model/ProductsData';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Cart } from './components/Cart';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Sucsess';
import { ProductInCatalog } from './components/ProductInCatalog';
import { ProductPreview } from './components/ProductPreview';
import { ProductInCart } from './components/ProductInCart';

// Экземпляр эмиттера событий
const events = new EventEmitter();

// Экземпляры моделей данных
const productsData = new ProductsData(events);
const cartData = new CartData(events);
const clientData = new ClientData(events);


//Все темплейты
const productCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const sucsessTemplate = ensureElement<HTMLTemplateElement>('#success');


//Экземпляры классов представления
const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cart = new Cart(cloneTemplate(cartTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(sucsessTemplate), events)
const productPreview = new ProductPreview(cloneTemplate(productPreviewTemplate), events);


//Загружены данные товаров с сервера
events.on('products:set', () => { 
    const productsArray = 
        productsData.products.map(product => 
                new ProductInCatalog(cloneTemplate(productCatalogTemplate), events)
                    .render(product));
    page.render({
        catalog: productsArray, 
        counter: cartData.getCount(),
    });
});

//Выбран товар для показа в модальном окне
events.on('product:select', (data: {id: string}) => {
    const preview = productsData.getProduct(data.id);
    events.emit('product:selected', preview)
});

//Отображение выбранного товара в модальном окне
events.on('product:selected', (preview:IProduct) => {
    const previewElement = productPreview.render({
        ...preview, 
        inCart: cartData.inCart(preview.id)
    });
    modal.render({content: previewElement});
});

//Добавление выбранного товара в корзину
events.on('product:buy', (data: {id: string}) => {
    const productToBuy = productsData.getProduct(data.id);
    cartData.addProduct(productToBuy);
    modal.close();
});

//Изменение данных корзины
events.on('cart:changed', () => {   
    const productsinCartArray = 
        cartData.products.map(product => 
            new ProductInCart(cloneTemplate(productCartTemplate), events)
                .render(product));
    cart.render({
        items: productsinCartArray, 
        total: cartData.getTotal(), 
        index: productsinCartArray, 
        isEmpty: cartData.isEmpty(),
    });
    page.render({counter: cartData.getCount()});
});

//Открытие модального окна корзины
events.on('cart:open', () => {
	modal.render({
        content: cart.render({
            isEmpty: cartData.isEmpty(),
        }),
    });
});

//Удаление выбранного товара из корзины
events.on('productInCart:delete', (data: {id: string}) => {
    cartData.deleteProduct(data.id);
});

//Открытие формы оформления заказа
events.on('order:open', () => {
    modal.render({
        content: order.render({
            payment: clientData.clientData.payment,
            address: clientData.clientData.address,
            valid: clientData.validateOrder(),
            errors: [],
        }),
    });
});

//Изменение в поле ввода данных заказа
events.on(
    /^order\..*:change/,
    (data: { field: keyof TClientOrderData; value: string }) => {
      clientData.setOrderField(data.field, data.value)
    },
  );

//Изменение данных заказа
events.on('orderForm:change', (errors: Partial<TClientOrderData>) => {
    const { address, payment } = errors;    
    order.valid = !payment && !address;
    order.errors = Object.values({ payment, address })
      .filter((i) => !!i)
      .join('; ');
  });

//Подтверждение в форме данных заказа и открытие модального окна контактов
events.on('order:submit', () => {
    modal.render({
        content: contacts.render({
            phone: clientData.clientData.phone,
            email: clientData.clientData.email,
            valid: clientData.validateContacts(),
            errors: [],
        }),
    });
});

////Изменение в поле ввода контактных данных
events.on(
    /^contacts\..*:change/,
    (data: { field: keyof TClientPersonalData; value: string }) => {
      clientData.setContactsField(data.field, data.value)
    }
  );

//Изменение контактных данных покупателя
events.on('contactsForm:change', (errors: Partial<TClientPersonalData>) => {
    const { email, phone } = errors;
    contacts.valid = !phone && !email;
    contacts.errors = Object.values({ email, phone })
      .filter((i) => !!i)
      .join('; ');
  });

//Закрытие модального окна успешного заказа
events.on('sucsess:submit', () => {
    modal.close();
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});


//Отправка данных заказа на сервер
events.on('contacts:submit', () => {     
    (async () => {
        try {
            const order = await appApi.placeOrder({
                ...clientData.clientData, 
                items: cartData.productsForOrder.map(product => product.id), 
                total: cartData.getTotal()
            });
            cartData.emptyCart();
            clientData.clearData();
            modal.render({
                content: success.render({
                    total: order.total,
                }),
            });
        } catch (error) {
            console.log(error);
        };
    })();
});


//Загрузка изначальных данных с сервера
(async () => {
    try { 
        const data = await appApi.getProducts();
        productsData.products = data;
    } catch (error) {
        console.log(error);
    };
})();













 
