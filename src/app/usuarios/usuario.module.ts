import 'hammerjs';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { UsuarioRoutes } from './usuario.routing';

/**
 * DatePipe.
 */
import locale from '@angular/common/locales/es-CL';
registerLocaleData(locale, 'es-CL');

/**
 * Services.
 */
import { UsuarioService } from './services';

/**
 * Components.
 */
import { UsuarioComponent, UsuarioCreateComponent, UsuarioUpdateComponent } from './components';

/**
 * Validators.
 */
import { EmailUniqueValidate } from './validators';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UsuarioRoutes),
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        UsuarioComponent,
        UsuarioCreateComponent,
        UsuarioUpdateComponent
    ],
    providers: [
        UsuarioService,
        EmailUniqueValidate,
        DatePipe,
        TitleCasePipe,
        LowerCasePipe,
        { provide: LOCALE_ID, useValue: "es-CL" }
    ]
})
export class UsuarioModule { }
