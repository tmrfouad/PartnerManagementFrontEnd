import { ActionType } from './ActionType';

export interface RFQAction {
    ActionId: number;
    ActionCode: string;
    ActionTime: Date;
    ActionType: ActionType;
    CompanyRepresentative: string;
    Comments: string;
    RFQId: number;
    SubmissionTime: Date;
    UniversalIP: string;
}
