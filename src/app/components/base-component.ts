import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingComponent } from './loading/loading.component';
import { MessageComponent } from './message/message.component';

export class BaseComponent {
    private loadingDialogRef: MatDialogRef<LoadingComponent>;

    constructor(
        protected snackBar: MatSnackBar,
        protected dialog: MatDialog) { }

    showSnackBar(message: string, action?: string, isError?: boolean) {
        const snackBarRef = this.snackBar.open(message, action, {
            duration: isError ? 5000 : 2000,
            panelClass: isError ? 'snack-bar-error' : 'snack-bar'
        });
    }

    protected showLoading(message?: string) {
        this.loadingDialogRef = this.dialog.open(LoadingComponent, {
            width: '300px',
            disableClose: true
        });
        this.loadingDialogRef.componentInstance.message = message;
    }

    protected closeLoading() {
        this.loadingDialogRef.close();
    }

    protected showMessage(message: string, title?: string) {
        const confirmDialog = this.dialog.open(MessageComponent, {
            data: {
                title: title,
                message: message
            }
        });
    }

    protected showConfirm(message: string, title?: string) {
        const confirmDialog = this.dialog.open(ConfirmComponent, {
            data: {
                title: title,
                message: message
            }
        });

        return confirmDialog.afterClosed();
    }
}
