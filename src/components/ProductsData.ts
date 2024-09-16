import { IProduct, IProductList } from "../types";
import { IEvents } from "./base/events";


export class ProductsData implements IProductList {
    protected _products: IProduct[];
    protected _preview: string;
    protected events: IEvents;

    constructor (events: IEvents) {
        this.events = events;
    }

    set products(products:IProduct[]) {
        this._products = products;
        this.events.emit('products:changed')
    }

    get products () {
        return this._products;
    }

    getProduct(productId: string) {
        return this._products.find((item) => item._id === productId);
    }

    set preview(productId: string | null) {
        if (!productId) {
            this._preview = null;
            return;
        }
        const selectedProduct = this.getProduct(productId);
        if (selectedProduct) {
            this._preview = productId;
            this.events.emit('product:selected')
        }
    }
}