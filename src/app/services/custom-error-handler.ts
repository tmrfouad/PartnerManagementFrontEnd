import { ErrorHandler, Injectable, Injector, style } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CutomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {

    }
    handleError(error): void {
        const errString: string = error.toString();
        const braces = Object.entries(errString).filter(c => c['1'] === '{' || c['1'] === '}');

        const errObjArray = [];

        if (braces.length === 0) {
            const err = errString.split(' at ')[0].split('TypeError: ')[1].trim();
            const errorObjStr = `{ "status": -1, "message": "TypeError: ${err}" }`;
            errObjArray.push(JSON.parse(errorObjStr));
        } else {
            // tslint:disable-next-line:radix
            let openIndx = parseInt(braces[0]['0']);
            let closeIndx = -1;
            let openCnt = 0;
            braces.forEach(b => {
                if (openCnt === 0) {
                    // tslint:disable-next-line:radix
                    openIndx = parseInt(b['0']);
                }
                if (b['1'] === '{') {
                    openCnt++;
                }
                if (b['1'] === '}') {
                    openCnt--;
                }
                if (openCnt === 0) {
                    // tslint:disable-next-line:radix
                    closeIndx = parseInt(b['0']);
                    const errStr = errString.substring(openIndx, closeIndx + 1);
                    errObjArray.push(JSON.parse(errStr));
                }
            });
        }

        const errorObj = errObjArray[0];

        const errStatus: number = errorObj.status;
        let errMsg;

        switch (errStatus) {
            case 0:
                errMsg = 'Failed to contact server.';
                break;
            default:
                if (errorObj.error && errorObj.error.Data) {
                    const errId = errorObj.error.Data['HelpLink.EvtID'];
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

        const snakBar = this.injector.get(MatSnackBar);
        snakBar.open(errMsg, 'Error', {
            verticalPosition: 'bottom',
            duration: 5000,
            panelClass: 'snack-bar-error'
        });

        console.log('Error log :', errObjArray);
    }
}
