import { IClient } from "../types";
import { IEvents } from "../base/EventEmitter";

export class ClientData implements IClient {
    protected _payment: string;
    protected _address: string;
    protected _email: string;
    protected _phone: string;
    protected events: IEvents;

    constructor (events: IEvents) {
        this.events = events;
    }

    getClientData() {
        return { 
            payment: this.payment, 
            address: this.address, 
            email: this.email, 
            phone: this.phone
        }
    }
    
    get payment() {
        return this._payment;
    }

    get address() {
        return this._address;
    }

    get email() {
        return this._email;
    }

    get phoneNumber() {
        return this._phone;
    }

    set payment(payment: string) {
        this._payment = payment;
    }

    set address(address: string) {
        this._address = address;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

}