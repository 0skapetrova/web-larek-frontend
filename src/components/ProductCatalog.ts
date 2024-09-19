import { Component } from "./base/Component";

interface IProductCatalog {
    catalog: HTMLElement[];
}

export class ProductCatalog extends Component<IProductCatalog> {
    protected _catalog: HTMLElement[];
    

    constructor(protected container: HTMLElement) {
        super(container);
        this._catalog = [];
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}