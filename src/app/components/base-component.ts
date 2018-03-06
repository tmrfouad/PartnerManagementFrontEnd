import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { LoadingComponent } from './loading/loading.component';

export class BaseComponent {
    private loadingDialogRef: MatDialogRef<LoadingComponent>;

    constructor(
        protected snackBar: MatSnackBar,
        protected dialog: MatDialog) { }

    showSnackBar(message: string, action?: string, isError?: boolean) {
        const snackBarRef = this.snackBar.open(message, action, {
            duration: 1000,
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
}
