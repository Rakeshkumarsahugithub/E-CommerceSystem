const PRODUCT_SERVICE_URL = 'http://localhost:3001';
const CUSTOMER_SERVICE_URL = 'http://localhost:3002';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    isActive: boolean;
}

export interface Order {
    id: number;
    customerId: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    products: Product[];
}

export interface CreateOrderRequest {
    customerId: number;
    products: { id: number; quantity: number }[];
    totalAmount: number;
}

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

export const createCustomer = async (customerData: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await fetch(`${CUSTOMER_SERVICE_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
    });
    if (!response.ok) {
        throw new Error('Failed to create customer');
    }
    return response.json();
};

export const checkEmail = async (email: string): Promise<Customer | null> => {
    try {
        const response = await fetch(`${CUSTOMER_SERVICE_URL}/customers/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            if (response.status === 404 || response.status === 500) { // 500 because we threw Error in controller
                return null;
            }
            return null;
        }
        return response.json();
    } catch (error) {
        return null;
    }
};

export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    });
    if (!response.ok) {
        throw new Error('Failed to create order');
    }
    return response.json();
};

export const getOrdersByCustomerId = async (customerId: number): Promise<Order[]> => {
    const response = await fetch(`${PRODUCT_SERVICE_URL}/orders/customer/${customerId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return response.json();
};
