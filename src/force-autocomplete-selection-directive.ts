import {Subject} from 'rxjs';
import {take, skipWhile, takeUntil} from 'rxjs/operators';
import {
    AfterContentInit,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatOption} from '@angular/material/core';

@Directive({selector: '[forceAutocompleteSelection]'})
export class ForceAutocompleteSelectionDirective implements OnInit, AfterContentInit, OnDestroy {
    @Input('matAutocomplete')
    private autocomplete?: MatAutocomplete;
    private selectedValue?: string;
    private unsubscription$: Subject<void> = new Subject();

    constructor(private element: ElementRef, private control: NgControl) {}

    public ngOnInit(): void {
        this.autocomplete?.optionSelected
            .pipe(takeUntil(this.unsubscription$))
            .subscribe((event: MatAutocompleteSelectedEvent) => {
                this.selectedValue = event.option.viewValue;
            });
    }

    public ngAfterContentInit(): void {
        this.forceSelection();
    }

    public ngOnDestroy(): void {
        this.unsubscription$.next();
        this.unsubscription$.complete();
    }

    @HostListener('blur', ['$event'])
    private onBlur(event: FocusEvent): void {
        if (!this.autocomplete) {
            return;
        }

        if (!this.control.control!.value) {
            this.selectedValue = '';

            return;
        }

        const autocompleteElement = this.autocomplete.panel?.nativeElement as HTMLElement | undefined;
        const relatedTarget = event.relatedTarget as HTMLElement | null;

        if (relatedTarget?.tagName.toLowerCase() === 'mat-option' && autocompleteElement?.contains(relatedTarget)) {
            return;
        }

        this.forceSelection();
    }

    private forceSelection(): void {
        if (!this.autocomplete) {
            return;
        }

        if (this.isOptionsLoading(this.autocomplete.options)) {
            this.autocomplete.options.changes
                .pipe(skipWhile(this.isOptionsLoading.bind(this)), takeUntil(this.unsubscription$), take(1))
                .subscribe(this.forceSelection.bind(this));

            return;
        }

        const value = this.element.nativeElement.value.trim().toLowerCase();
        const forcedValue = this.autocomplete!.options.find((option: MatOption) => {
            return option.viewValue.toLowerCase() === value;
        });
        this.selectedValue = forcedValue?.viewValue ?? this.selectedValue ?? '';
        this.control.control!.setValue(this.selectedValue);
    }

    private isOptionsLoading(options: QueryList<MatOption>): boolean {
        return (
            options.length === 1 &&
            options.first.disabled &&
            options.first._getHostElement().classList.contains('is-loading')
        );
    }
}
