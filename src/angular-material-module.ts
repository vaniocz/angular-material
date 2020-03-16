import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {ConfirmComponent} from './confirm/confirm-component';
import {ToasterComponent} from './toaster/toaster-component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
    ],
    declarations: [ConfirmComponent, ToasterComponent],
})
export class AngularMaterialModule {}
