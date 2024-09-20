import { IEvents } from "../base/EventEmitter";
import { TClientPersonalData } from "../types";
import { Form } from "./common/Form";

export class Contacts extends Form<TClientPersonalData> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}