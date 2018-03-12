export interface REP {
     representativeId: number ;
     Name: string ;
     Address?: string ;

     phone?: string;
     personalPhone?: string;

     position?: string;
     universalIP?: string;

     continuous?: boolean;
     dateOfBirth?: Date;
     submissionTime?: Date;
}
