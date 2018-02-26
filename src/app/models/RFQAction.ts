import { ActionType } from './ActionType';

export interface RFQAction {
    actionId: number;
    actionCode: string;
    actionTime: Date;
    actionType: ActionType;
    companyRepresentative: string;
    comments: string;
    rfqId: number;
    submissionTime: Date;
    universalIP: string;
}
