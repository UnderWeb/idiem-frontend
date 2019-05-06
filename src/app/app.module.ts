import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './shared';

/**
 * Components.
 */
import { AppComponent } from './app.component';
import { AppBlankComponent } from './layouts';

/**
 * Routes.
 */
import { AppRoutes } from './app.routing';

/**
 * Modules.
 */
import { UsuarioModule } from './usuarios';

@NgModule({
    declarations: [
        AppComponent,
        AppBlankComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        SharedModule,
        MatSidenavModule,
        RouterModule.forRoot(AppRoutes),
        UsuarioModule
    ],
    exports: [
        MatSidenavModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
