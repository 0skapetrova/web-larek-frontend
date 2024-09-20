import { IEvents } from "../base/EventEmitter";
import { TClientOrderData } from "../types";
import { Form } from "./common/Form";

export class Order extends Form<TClientOrderData> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set payment(value: string) {
        (this.container.elements.namedItem('payment') as HTMLInputElement).value = value;
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}