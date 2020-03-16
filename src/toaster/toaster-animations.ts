import {animate, style, transition, trigger} from '@angular/animations';

export const toasterAnimations = trigger('toasterAnimations', [
    transition(':enter', [
        style({
            transform: 'scale(0.8)',
            opacity: 0,
        }),
        animate(
            '150ms cubic-bezier(0, 0, 0.2, 1)',
            style({
                transform: 'scale(1)',
                opacity: 1,
            }),
        ),
    ]),
    transition(':leave', [
        animate(
            '75ms cubic-bezier(0.4,0, 1, 1)',
            style({
                transform: 'scale(0.8)',
                opacity: 0,
            }),
        ),
    ]),
]);
