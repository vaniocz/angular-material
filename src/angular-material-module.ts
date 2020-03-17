import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {ConfirmComponent} from './confirm/confirm-component';
import {ToasterComponent} from './toaster/toaster-component';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    declarations: [ConfirmComponent, ToasterComponent],
})
export class AngularMaterialModule {}
