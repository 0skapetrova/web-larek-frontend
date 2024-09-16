import { IClient } from "../types";
import { IEvents } from "./base/events";

export class ClientData implements IClient {
    protected _paymentMethod: string;
    protected _address: string;
    protected _email: string;
    protected _phoneNumber: string;
    events: IEvents;

    constructor (events: IEvents) {
        this.events = events;
    }

    getClientData() {
        return { paymentMethod: this.paymentMethod, address: this.address, email: this.email, phoneNumber: this.phoneNumber}
    }

    set paymentMethod(paymentMethod: string) {
        this._paymentMethod = paymentMethod;
    }

    set address(address: string) {
        this._address = address;
    }

    set email(email: string) {
        this._email = email;
    }

    set phoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber;
    }

}