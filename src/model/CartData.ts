import { ICart, IProduct } from "../types";
import { IEvents } from "../base/EventEmitter";

export class CartData implements ICart {
    protected _products: IProduct[];
    protected events: IEvents;

    constructor (events: IEvents) {
        this.events = events;
        this._products = [];
    }

    get products() {
        return this._products;
    }

    get productsForOrder() {
        return this._products.filter(product => product.price !== Infinity)
    }

    addProduct(product: IProduct): void {
        this._products = [product, ...this._products]
        this.events.emit('basket:changed');
    }

    deleteProduct(productId: string): void {
        this._products = this._products.filter(product => product.id !== productId);
        this.events.emit('basket:changed');

    }

    emptyBasket(): void {
        this._products = [];
        this.events.emit('basket:changed');
    }

    getCount() {
        return this._products.length; 
    }

    getTotal(): number {
        return this._products.reduce((total, product) => {
            if (product.price === Infinity) {
                return total
            } 
            return total += product.price
        }, 0)
    }

    isEmpty(): boolean {
        return this._products.length === 0
    }

}