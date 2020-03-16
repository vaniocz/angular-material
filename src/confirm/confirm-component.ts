import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ConfirmDialog} from './confirm';

interface DialogData {
    confirm: ConfirmDialog;
    close: (result: boolean) => void;
}

@Component({
    templateUrl: './confirm-component.html',
    styleUrls: ['./confirm-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ConfirmComponent {
    constructor(@Inject(MAT_DIALOG_DATA) private dialogData: DialogData) {}

    public get confirmDialog(): ConfirmDialog {
        return this.dialogData.confirm;
    }

    public confirm(): void {
        this.dialogData.close(true);
    }

    public dismiss(): void {
        this.dialogData.close(false);
    }
}
