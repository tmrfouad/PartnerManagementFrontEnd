import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CutomErrorHandler implements ErrorHandler {

    handleError(error): void {
        // throw new Error("Method not implemented.");
        // your custom error handling logic
        console.log('from Custom Handeler ');
        console.log(error.message);
    }
}
