import { IEvents } from "../base/EventEmitter";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _cartButton: HTMLButtonElement;
    protected _catalog: HTMLElement;
    protected _pageWrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._counter = this.container.querySelector('.header__basket-counter');
        this._cartButton = this.container.querySelector('.header__basket');
        this._catalog = this.container.querySelector('.gallery');
        this._pageWrapper = this.container.querySelector('.page__wrapper');

        this._cartButton.addEventListener('click', () => {
            this.events.emit('cart:open');
        });
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }
    
    set locked(value: boolean) {
        if (value) {
            this._pageWrapper.classList.add('page__wrapper_locked');
        } else {
            this._pageWrapper.classList.remove('page__wrapper_locked');
        }
    }

}