import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

import {ToasterComponent} from './toaster-component';

export interface ToastNotificationOptions {
    severity?: 'success' | 'error' | 'warning' | 'info';
    closable?: boolean;
    duration?: number;
    icon?: string | boolean;
}

export interface ToastNotification {
    id: number;
    message: string;
    options: ToastNotificationOptions;
}

@Injectable({providedIn: 'root'})
export class Toaster {
    private notifications: ToastNotification[] = [];
    private notifications$ = new BehaviorSubject(this.notifications);
    private notificationsCount = 0;
    private lastNotificationId = 0;
    private snackBarReference?: MatSnackBarRef<ToasterComponent>;
    private closeTimeout?: NodeJS.Timeout;

    public constructor(private snackBar: MatSnackBar) {}

    public openNotification(message: string, options?: ToastNotificationOptions): number {
        const id = this.lastNotificationId++;
        this.notifications.push({id, message, options: {...{severity: 'info', closable: true}, ...options}});
        this.notifications$.next(this.notifications);

        if (!this.notificationsCount++) {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
                delete this.closeTimeout;
            } else {
                this.snackBarReference = this.snackBar.openFromComponent(ToasterComponent, {
                    data: {
                        notifications$: this.notifications$,
                        closeNotification: this.closeNotification.bind(this),
                    },
                    duration: Infinity,
                    panelClass: 'toaster',
                });
            }
        }

        if (options?.duration !== Infinity) {
            setTimeout(() => this.closeNotification(id), options?.duration ?? 5000);
        }

        return id;
    }

    public closeNotification(id: number): void {
        const index = this.notifications.findIndex((notification: ToastNotification) => notification.id === id);

        if (index === -1) {
            return;
        }

        this.notifications.splice(index, 1);
        this.notifications$.next(this.notifications);

        if (!--this.notificationsCount) {
            // Dismissing of snackBar using timeout to avoid animations interference
            this.closeTimeout = setTimeout(() => {
                delete this.closeTimeout;
                this.snackBarReference!.dismiss();
            }, 500);
        }
    }

    public closeAll(): void {
        this.notifications = [];
        this.notifications$.next(this.notifications);
        this.notificationsCount = 0;
    }
}
