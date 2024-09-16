export interface IProduct {
    _id: string;
    description?: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IClient {
    paymentMethod: string;
    address: string;
    email: string;
    phoneNumber: string;
}


export interface IProductList {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
}

export interface IBasket {
    products: IProduct[]
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    emptyBasket(): void;
    getCount(products: IProduct[]): number;
    getTotal(products: IProduct[]): number;
    isEmpty(count :number): boolean;
    hasPrice(total: number): boolean;
}

export interface IClientData {
    getClientData(): IClient;
}

export interface IOrder {
    payment: string
    email: string
    phone: string
    address: string
    total: number
    items: string[]
}

export type TProductBaseInfo = Pick<IProduct, '_id' | 'title' | 'price'>;

export type TClientOrderData = Pick<IClient, 'paymentMethod' | 'address'>;

export type TClientPersonalData = Pick<IClient, 'email' | 'phoneNumber'>;