export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IProductList {
    products: IProduct[];
    getProduct(productId: string): IProduct;
}

export interface ICart {
    products: IProduct[];
    productsForOrder: IProduct[];
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    emptyCart(): void;
    getCount(): number;
    getTotal(): number;
    isEmpty(): boolean;
    inCart(id: string): boolean;
}

export interface IClientData {
    clientData: TClientOrderData & TClientPersonalData;
}

export interface IOrder {
    payment: string
    email: string
    phone: string
    address: string
    total: number
    items: string[]
}

export type TClientOrderData = Pick<IOrder, 'payment' | 'address'>;

export type TClientPersonalData = Pick<IOrder, 'email' | 'phone'>;

export type FormErrors = Partial<Record<keyof IOrder, string>>;