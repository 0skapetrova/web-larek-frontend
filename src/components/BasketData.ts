import { IBasket, IProduct } from "../types";
import { IEvents } from "./base/events";

export class BasketData implements IBasket {
    _products: IProduct[];
    events: IEvents;

    constructor (events: IEvents) {
        this.events = events;
    }

    set products(products: IProduct[]) {
        this._products = products;
        this.events.emit('basket:changed')
    }

    get products() {
        return this._products;
    }

    addProduct(product: IProduct): void {
        this._products = [product, ...this._products]
        this.events.emit('basket:changed');
    }

    deleteProduct(productId: string): void {
        this._products = this._products.filter(product => product._id !== productId);
        this.events.emit('basket:changed');
    }

    emptyBasket(): void {
        this._products = [];
        this.events.emit('basket:changed');
    }

    getCount() {
        return this._products.length;
    }

    getTotal(products: IProduct[]): number {
        
    }

    isEmpty(count: number): boolean {
        
    }

    hasPrice(total: number): boolean {
        
    }

}