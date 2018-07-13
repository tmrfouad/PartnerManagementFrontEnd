import { InvActivity } from './enumerations/InvActivity';

export interface InvoiceActivity {
    id?: number;
    invoiceId?: number;
    activity?: InvActivity;
    date?: Date;
    universalIP?: string;
    created?: Date;
    modified?: Date;
}
