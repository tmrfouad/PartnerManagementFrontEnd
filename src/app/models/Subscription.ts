import { SubscriptionStatus } from './enumerations/SubscriptionStatus';

export interface Subscription {
    id?: number;
    productId?: number;
    productArabicName?: string;
    productEnglishName?: string;
    productEditionId?: number;
    productEditionArabicName?: string;
    productEditionEnglishName?: string;
    partnerId?: number;
    date?: Date;
    duration?: number;
    status?: SubscriptionStatus;
    universalIP?: string;
    created?: Date;
    modified?: Date;
}
