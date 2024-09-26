import { FormErrors, IClientData, TClientOrderData, TClientPersonalData } from "../types";
import { IEvents } from "../base/EventEmitter";

export class ClientData implements IClientData {
    protected _clientData: TClientOrderData & TClientPersonalData
    protected events: IEvents;
    formErrors: FormErrors = {};

    constructor (events: IEvents) {
        this.events = events;
        this._clientData = {
            payment: '',
            address: '',
            email: '',
            phone: '',
        };
    };;
    
    get clientData() {
        return this._clientData;
    };

    setOrderField(field: keyof TClientOrderData, value: string) {
        this._clientData[field] = value;

        if (this.validateOrder()) {
            return;
        };
    };

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this._clientData.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        };
        if (!this._clientData.address) {
            errors.address = 'Необходимо указать адрес';
        };
        this.formErrors = errors;
        this.events.emit('orderForm:change', this.formErrors);
        return Object.keys(errors).length === 0;
    };

    setContactsField(field: keyof TClientPersonalData, value: string) {
        this._clientData[field] = value;
        
        if (this.validateContacts()) {
            return;
        };
    };

    validateContacts() {                   
        const errors: typeof this.formErrors = {};
        if (!this._clientData.email) {
            errors.email = 'Необходимо указать email';
        };
        if (!this._clientData.phone) {
            errors.phone = 'Необходимо указать телефон';
        };
        this.formErrors = errors;        
        this.events.emit('contactsForm:change', this.formErrors);
        
        return Object.keys(errors).length === 0;
    };
};