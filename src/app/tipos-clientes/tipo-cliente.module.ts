import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared';

/**
 * Services.
 */
import { TipoClienteService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    declarations: [],
    providers: [
        TipoClienteService
    ]
})
export class TipoClienteModule { }
