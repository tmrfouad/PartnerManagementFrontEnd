import { InvoiceStatus } from './enumerations/InvoiceStatus';

export interface Invoice {
    id?: number;
    subscriptionId?: number;
    invoiceNo?: string;
    date?: Date;
    price?: number;
    status?: InvoiceStatus;
    paid?: boolean;
    universalIP?: string;
    created?: Date;
    modified?: Date;
}
