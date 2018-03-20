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

        const errStatus: number = errorObj.status;
        let errMsg;

        switch (errStatus) {
            case 0:
                errMsg = 'Failed to contact server.';
                break;
            default:
                if (errorObj.error.Data) {
                    const errId = errorObj.error.Data['HelpLink.EvtID'];
                    console.log(errId);
                    switch (errId) {
                        case '515':
                            errMsg = 'The data you entered is incomplete.';
                            break;
                        case '2601':
                            errMsg = 'The data you entered is repeated.';
                            break;
                        default:
                            errMsg = errorObj.error.Message;
                            break;
                    }
                } else {
                    errMsg = errorObj.message;
                }
                break;
        }

        console.log(errorObj);

        const snakBar = this.injector.get(MatSnackBar);
        snakBar.open(errMsg, 'Error', {
            verticalPosition: 'bottom',
            duration: 5000,
            panelClass: 'snack-bar-error'
        });
    }
}
