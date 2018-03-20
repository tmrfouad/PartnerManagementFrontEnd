import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CutomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {

    }
    handleError(error): void {
        const snakBar = this.injector.get(MatSnackBar);
        snakBar.open('CutomErrorHandler ' + error.error.Message, 'Error', { duration: 2000 });
    }
}
