import { ProductEdition } from './ProductEdition';
export interface Product {
    id: number;
    englishName: string;
    arabicName: string;
    productEditions: ProductEdition[];
}
