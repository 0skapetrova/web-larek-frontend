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

        this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
        this._cartButton = ensureElement<HTMLButtonElement>('.header__basket', container);
        this._catalog = ensureElement<HTMLElement>('.gallery', container);
        this._pageWrapper = ensureElement<HTMLElement>('.page__wrapper', container);

        this._cartButton.addEventListener('click', () => {
            this.events.emit('cart:open');
        });
    };

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }
    
    set locked(value: boolean) {
        if (value) {
            this.toggleClass(this._pageWrapper, 'page__wrapper_locked', true);
        } else {
            this.toggleClass(this._pageWrapper, 'page__wrapper_locked', false);
        }
    }
}