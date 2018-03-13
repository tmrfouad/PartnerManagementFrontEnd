import { ActionType } from './ActionType';
import { REP } from './REP';

export interface RFQAction {
    id?: number;
    actionCode?: string;
    actionTime?: Date;
    actionType?: ActionType;
    representativeId?: number;
    comments?: string;
    rfqId?: number;
    submissionTime?: Date;
    universalIP?: string;
}
