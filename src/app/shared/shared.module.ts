import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { getSpanishPaginatorIntl, DateAdapterService, APP_DATE_FORMATS } from './services';
import { DigitDirective } from './directives';

import {
    MatPaginatorIntl,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatRippleModule,
    MatTooltipDefaultOptions,
    MAT_TOOLTIP_DEFAULT_OPTIONS
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import { FormatRutPipe } from './pipes';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 100,
    hideDelay: 100,
    touchendHideDelay: 100
};

@NgModule({
    imports: [
        
    ],
    declarations: [
        DigitDirective,
        FormatRutPipe
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatTableModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatBadgeModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
        CdkTableModule,
        A11yModule,
        BidiModule,
        CdkAccordionModule,
        ObserversModule,
        OverlayModule,
        PlatformModule,
        PortalModule,
        DigitDirective,
        FormatRutPipe
    ],
    providers: [
        {
            provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()
        },
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'es-CL'
        },
        {
            provide: DateAdapter,
            useClass: DateAdapterService
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: APP_DATE_FORMATS
        },
        {
            provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
            useValue: myCustomTooltipDefaults
        }
    ]
})
export class SharedModule {}
