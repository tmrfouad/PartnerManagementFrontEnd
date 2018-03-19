import { Product } from './Product';
import { ProductEdition } from './ProductEdition';

export interface RFQ {
    contactPersonEnglishName?: string;
    contactPersonMobile?: string;
    contactPersonEmail?: string;
    contactPersonArabicName?: string;
    contactPersonPosition?: string;

    companyEnglishName?: string;
    companyArabicName?: string;

    address?: string;
    status?: number;
    submissionTime?: Date;
    universalIP?: string;
    location?: string;
    phoneNumber?: string;
    rfqCode?: number;
    selectedEditionId?: number;
    selectedEdition?: ProductEdition;
    website?: string;
    targetedProductId?: number;
    targetedProduct?: Product;

    rfqId?: number;

    sendEmail?: boolean;
}
