import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {ConfirmComponent} from './confirm-component';

export interface ConfirmOptions {
    title?: string;
    confirmLabel?: string;
    dismissLabel?: string;
}

export interface ConfirmDialog extends ConfirmOptions {
    message: string;
}

@Injectable({providedIn: 'root'})
export class Confirm {
    private dialogReference?: MatDialogRef<ConfirmComponent, boolean>;

    public constructor(private dialog: MatDialog) {}

    public open(message: string, options?: ConfirmOptions): Observable<boolean | undefined> {
        this.dialogReference = this.dialog.open(ConfirmComponent, {
            data: {
                confirm: {message, ...options},
                close: this.close.bind(this),
            },
        });

        return this.dialogReference.afterClosed();
    }

    public close(result: boolean = false): void {
        if (this.dialogReference) {
            this.dialogReference.close(result);
        }
    }
}
