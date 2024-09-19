export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IClient {
    payment: string;
    address: string;
    email: string;
    phone: string;
}


export interface IProductList {
    products: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
}

export interface ICart {
    products: IProduct[];
    productsForOrder: IProduct[];
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    emptyBasket(): void;
    getCount(): number;
    getTotal(): number;
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

export type TProductBaseInfo = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TClientOrderData = Pick<IClient, 'payment' | 'address'>;

export type TClientPersonalData = Pick<IClient, 'email' | 'phone'>;