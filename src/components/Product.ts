import { IEvents } from "../base/EventEmitter";
import { IProduct } from "../types";
import { ensureElement, formatNumber } from "../utils/utils";
import { Component } from "./base/Component";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Product extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description: HTMLElement;    
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents, actions?: ICardActions) {
        super(container);
        this.events = events;

        this._title = this.container.querySelector(`.card__title`);
        this._category = this.container.querySelector(`.card__category`);
        this._image = this.container.querySelector(`.card__image`);        
        this._description = this.container.querySelector(`.card__text`);
        this._price = this.container.querySelector(`.card__price`);
        this._button = this.container.querySelector(`.card__button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                this.container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    CategoryСolor: { [key: string]: string } = {
        'софт-скил': 'card__category_soft',
        'хард-скил': 'card__category_hard',
        'дополнительное': 'card__category_additional',
        'другое': 'card__category_other',
        'кнопка': 'card__category_button',
      };
    
      set category(value: string) {
        this.setText(this._category, value);
        if (this._category) {
          this.toggleClass(this._category, this.CategoryСolor[value], true);
        }    
      }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    set price(value: number) {
        if(value === null) {
            this.setText(this._price, 'бесценно');
        } else {
            if (value < 10000) {                
                this.setText(this._price, `${value} синапсов`);
            }
            this.setText(this._price, `${formatNumber(value, ' ')} синапсов`);            
        }        
    }    
}