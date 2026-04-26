import { Product } from "../(main)/products/product.types";

/**
 * Represents a single product entry in the shopping cart.
 * We store the whole product object and the quantity added by the user.
 */
export interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * Represents the global state of the shopping cart.
 * Includes all items and the calculated total price.
 */
export interface Cart {
    items: CartItem[];
    total: number;
}

export interface Order {
    id: number;

    user: {
        name: string;
        email: string;
    }

    address: string;

    paymentMethod: string;

    totals: number;

    payment: {
        paymentId: string;
    }

    items: OrderItem[];

}


export interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export interface OrderStore {
    user: {
        name: string;
        email: string;
    }

    address: string;

    paymentMethod: string;

    items: {
        product: {
            id: number;
        }
        quantity: number;
    }[]
}