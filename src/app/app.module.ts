import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from '@app/_alert';
import {JwtInterceptor} from '@app/_helpers/jwt.interceptor';
import {ErrorInterceptor} from '@app/_helpers/error.interceptor';
import { HeaderComponent } from '@app/components/header/header.component';
import { HomeComponent } from '@app/home';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TicketsComponent} from '@app/groups/tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    TicketsComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
