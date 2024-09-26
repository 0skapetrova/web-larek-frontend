import { IEvents } from "../base/EventEmitter";
import { ensureElement } from "../utils/utils";
import { ProductBase } from "./common/ProductBase";

export class ProductInCatalog extends ProductBase {
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected events: IEvents;

	constructor( protected container: HTMLElement, events: IEvents
	) {
		super(container, events);

		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
	}

	addEventListeners() {
        this.container.addEventListener('click', () => this.events.emit<{id: string}>('product:select', {id: this.id}));
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
}