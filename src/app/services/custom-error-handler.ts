import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CutomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {

    }
    handleError(error): void {
        const errString = error.toString();
        const errorObjStr = errString.substring(errString.indexOf('{'), errString.lastIndexOf('}') + 1);
        const errorObj = JSON.parse(errorObjStr);

        const snakBar = this.injector.get(MatSnackBar);
        snakBar.open(errorObj.error.Message, 'Error', {
            duration: 5000,
            panelClass: 'snack-bar-error'
        });
    }
}
