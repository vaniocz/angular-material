import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import {ConfirmComponent} from './confirm/confirm-component';
import {ForceAutocompleteSelectionDirective} from './force-autocomplete-selection-directive';
import {ToasterComponent} from './toaster/toaster-component';

@NgModule({
    imports: [CommonModule, MatAutocompleteModule, MatButtonModule, MatDialogModule, MatIconModule],
    exports: [ForceAutocompleteSelectionDirective],
    declarations: [ConfirmComponent, ToasterComponent, ForceAutocompleteSelectionDirective],
})
export class AngularMaterialModule {}
