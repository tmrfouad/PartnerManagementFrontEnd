import { ActionType } from './enumerations/ActionType';
import { REP } from './REP';

export interface RFQAction {
    id?: number;
    actionCode?: string;
    actionTime?: Date;
    actionType?: ActionType;
    representativeId?: number;
    representative?: REP;
    comments?: string;
    rfqId?: number;
    submissionTime?: Date;
    universalIP?: string;
    rfqActionAtts?: { id?: number, fileName?: string, fileUrl?: string, fileType?: string, value?: any }[];
    active?: boolean;
}
