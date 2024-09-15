export interface IProduct {
    id: string;
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
}

export interface IBasket {
    items: IProduct[]
    total: number
    getBasketList(): IProduct[];
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    emptyBasket(): void;
}

export interface IClientData {
    getClientData(): IClient;
    setClientData(clientData: IClient): void;
    checkClientValidation(data: Record<keyof IClient, string>): boolean;
}

export type TProductBaseInfo = Pick<IProduct, 'id' | 'title' | 'price'>;

export type TClientOrderData = Pick<IClient, 'paymentMethod' | 'address'>;

export type TClientPersonalData = Pick<IClient, 'email' | 'phoneNumber'>;