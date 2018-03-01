
export interface RFQ {
    contactPersonEnglishName: string;
    contactPersonMobile: string;
    contactPersonEmail: string;
    contactPersonArabicName: string;
    contactPersonPosition: string;

    companyEnglishName: string;
    companyArabicName: string;

    address: string;
    status: string;
    submissionTime: Date;
    universalIP: string;
    location: string;
    phoneNumber: string;
    rfqCode: number;
    selectedBundle: string;
    website: string;
    targetedProduct: string;

    rfqId: number;
}
