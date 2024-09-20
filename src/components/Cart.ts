import { EventEmitter } from "../base/EventEmitter";
import { createElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";

interface ICartView {
    items: HTMLElement[];
    total: number;
}


export class Cart extends Component<ICartView> {
    protected _list: HTMLElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._list = container.querySelector('.basket__list');
        this._total = container.querySelector('.basket__price');
        this._button = container.querySelector('.basket__button');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit('order:open');                
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {    
        if (items.length) {
            this._list.replaceChildren(...items);
        } else {
            this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set total(total: number) {
        this.setText(this._total, `${formatNumber(total, ' ')} синапсов`)
    }
}