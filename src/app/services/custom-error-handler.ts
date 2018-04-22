import { ErrorHandler, Injectable, Injector, style, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class CutomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector, private zone: NgZone) {

    }
    handleError(error): void {
        try {
            const errString: string = error.toString();
            const braces = Object.entries(errString).filter(c => c['1'] === '{' || c['1'] === '}');

            const errObjArray = [];

            if (braces.length === 0) {
                const errStringNoTrace = errString.split(' at ')[0].replace('\n', ' ');
                const errs = errStringNoTrace.split('Error: ');
                let errorsConc = '';
                for (let i = 0; i < errs.length; i++) {
                    const err = errs[i].trim();
                    if (!err) { continue; }
                    if (err === '') { continue; }
                    errorsConc += (errorsConc === '' ||
                        errorsConc.substring(errorsConc.length - 1, errorsConc.length) === ':' ? '' : '; ') + err;
                }

                const errorObjStr = `{ "status": -1, "message": "${errorsConc}" }`;
                errObjArray.push(JSON.parse(errorObjStr));
            } else {
                let openIndx = Number(braces[0]['0']);
                let closeIndx = -1;
                let openCnt = 0;
                braces.forEach(b => {
                    if (openCnt === 0) {
                        openIndx = Number(b['0']);
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
                    if (errorObj.error) {
                        let errorObjError;
                        if (typeof errorObj.error === 'string') {
                            errorObjError = JSON.parse(errorObj.error);
                        } else {
                            errorObjError = errorObj.error;
                        }

                        if (errorObjError.Data) {
                            const errId = errorObjError.Data['HelpLink.EvtID'];
                            switch (errId) {
                                case '515':
                                    errMsg = 'The data you entered is incomplete.';
                                    break;
                                case '2601':
                                    errMsg = 'The data you entered is repeated.';
                                    break;
                                default:
                                    errMsg = errorObjError.Message;
                                    break;
                            }
                        } else {
                            errMsg = errorObjError.Message;
                        }
                    } else {
                        errMsg = errorObj.message;
                    }
                    break;
            }

            const snakBar = this.injector.get(MatSnackBar);
            if (this.zone) {
                this.zone.run(() => {
                    snakBar.open(errMsg, 'Error', {
                        verticalPosition: 'bottom',
                        duration: 5000,
                        panelClass: 'snack-bar-error'
                    });
            });
        }

        } catch {
            throw error;
        }
        console.log('Error log :', error);
        // throw error;
    }
}
