import { IEvents } from "../base/EventEmitter";
import { IProduct } from "../types";
import { cloneTemplate, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Product extends Component<IProduct> {
    protected title: HTMLElement;
    protected category: HTMLElement;
    protected image: HTMLImageElement;
    protected description: HTMLElement;    
    protected price: HTMLElement;
    protected button: HTMLButtonElement;
    protected events: IEvents;
    protected element: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents, actions?: ICardActions) {
        super(template)
        this.events = events;
        this.element = cloneTemplate(template);

        this.title = ensureElement<HTMLElement>(`.card__title`, this.element);
        this.category = ensureElement<HTMLElement>(`.card__category`, this.element);
        this.image = ensureElement<HTMLImageElement>(`.card__image`, this.element);        
        this.description = this.element.querySelector(`.card__text`);
        this.price = ensureElement<HTMLElement>(`.card__price`, this.element);
        this.button = this.element.querySelector(`.button`);

        if (actions?.onClick) {
            if (this.button) {
                this.button.addEventListener('click', actions.onClick);
            } else {
                this.element.addEventListener('click', actions.onClick);
            }
        }
    } 

    render(data: Partial<IProduct>): HTMLElement {
        Object.assign(this, data);
        return this.element;
    }

    set id(value: string) {
        this.element.dataset.id = value;
    }

    get id(): string {
        return this.element.dataset.id || '';
    }
}