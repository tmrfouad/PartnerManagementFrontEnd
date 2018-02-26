import { ShippingData } from './shipping-data';

export interface Order {
    delivery_needed: boolean;
    merchant_id: number;
    amount_cents: number;
    currency: string;
    merchant_order_id: number;
    items: any[];
    shipping_data: ShippingData;
}


