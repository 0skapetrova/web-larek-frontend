import { IEvents } from "../base/EventEmitter";
import { ProductBase } from "./common/ProductBase";


export class ProductInCart extends ProductBase {
    protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._button = this.container.querySelector(`.card__button`);
    }

    addEventListeners(): void {
        this._button.addEventListener('click', () => this.events.emit('productInCart:delete', {id: this.id}));
    }
}