import {Observable} from 'rxjs';
import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

import {ToastNotification} from './toaster';
import {toasterAnimations} from './toaster-animations';

interface SnackBarData {
    notifications$: Observable<ToastNotification[]>;
    closeNotification: (id: number) => void;
}

@Component({
    templateUrl: './toaster-component.html',
    styleUrls: ['./toaster-component.scss'],
    animations: [toasterAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ToasterComponent {
    public constructor(@Inject(MAT_SNACK_BAR_DATA) private snackBarData: SnackBarData) {}

    public get notifications(): Observable<ToastNotification[]> {
        return this.snackBarData.notifications$;
    }

    public close(id: number): void {
        this.snackBarData.closeNotification(id);
    }
}
